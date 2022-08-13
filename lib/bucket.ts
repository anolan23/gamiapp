import backend from '../lib/backend';
import axios, { AxiosError } from 'axios';

type Resource = 'users' | 'events';
type S3ObjectKey = string;

interface PresignedData {
  fields: any;
  url: string;
  key: S3ObjectKey;
}

interface Upload {
  resource: Resource;
  resourceId?: number;
  file: File;
}

interface DeleteParams {
  resource: Resource;
  resourceId?: number;
  key: S3ObjectKey;
}

export async function uploadViaPresignedPost({
  resource,
  resourceId,
  file,
}: Upload) {
  const requestPresignedUrl = async function () {
    try {
      const response = await backend.get<PresignedData>(
        `/api/uploads/${resource}`,
        {
          params: {
            type: file.type,
            id: resourceId,
          },
        }
      );
      return response.data;
    } catch (error: unknown | AxiosError) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
      }
      throw error;
    }
  };

  try {
    const presignedData = await requestPresignedUrl();

    const form = new FormData();
    Object.keys(presignedData.fields).forEach((key) =>
      form.append(key, presignedData.fields[key])
    );
    form.set('content-type', file.type);
    form.append('file', file);

    // Send the POST request
    await axios({
      method: 'POST',
      url: presignedData.url,
      data: form,
    });
    return presignedData.key;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      if (
        error.response?.headers?.['content-type']?.includes('application/xml')
      ) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(error.response.data, 'text/xml');
        const errorMsg =
          xmlDoc.getElementsByTagName('Message')[0].childNodes[0].nodeValue;
        if (errorMsg) throw new Error(errorMsg);
      }
    }
    throw error;
  }
}

export async function deleteImage({ resource, resourceId, key }: DeleteParams) {
  try {
    const response = await backend.delete(`/api/uploads/${resource}`, {
      params: {
        key,
        id: resourceId,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
    }
    throw error;
  }
}

export function buildImageUrl(key: string) {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_DOMAIN}/${key}`;
}

const bucket = {
  uploadViaPresignedPost,
  buildImageUrl,
  deleteImage,
};
export default bucket;
