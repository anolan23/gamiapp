import backend from '../lib/backend';
import axios, { AxiosError } from 'axios';

interface PresignedData {
  fields: any;
  url: string;
  key: string;
}

type Resource = 'users' | 'events';

interface Upload {
  resource: Resource;
  resourceId?: number;
  file: File;
}

export const uploadViaPresignedPost = async function ({
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
};

export const buildImageUrl = function (key: string) {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_DOMAIN}/${key}`;
};

const bucket = {
  uploadViaPresignedPost,
  buildImageUrl,
};
export default bucket;
