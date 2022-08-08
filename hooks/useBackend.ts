import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import backend from '../lib/backend';

function useBackend<T>(url?: string, config?: AxiosRequestConfig | null) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const get = async function () {
      try {
        if (!url) return;
        if (config === null) return;
        setLoading(true);
        const response = await backend.get(url, config);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, [url, config]);

  const mutate = function (data: T) {
    setData(data);
  };

  return { data, loading, error, mutate };
}

export default useBackend;
