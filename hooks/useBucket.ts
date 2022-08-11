import backend from '../lib/backend';
import axios from 'axios';

interface SignedUrlConfig {
  key: string;
  url: string;
}

type Resource = 'users' | 'events';

function useBucket() {
  const upload = async (resource: Resource, file: File) => {
    const getSignedUrlConfig = async () => {
      try {
        const response = await backend.get<SignedUrlConfig>(
          `/api/uploads/${resource}`,
          {
            params: {
              type: file.type,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    };
    try {
      const signedUrlConfig: SignedUrlConfig = await getSignedUrlConfig();
      await axios.put(signedUrlConfig.url, file);

      return signedUrlConfig.key;
    } catch (error) {
      throw error;
    }
  };

  const buildImageUrl = function (key: string) {
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_DOMAIN}/${key}`;
  };
  return { upload, buildImageUrl };
}
export default useBucket;
