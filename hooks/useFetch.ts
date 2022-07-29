import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

function useFetch<T>(url?: string | null, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const get = async function (url: string, config?: AxiosRequestConfig) {
    try {
      setLoading(true);
      const response = await axios.get(url, config);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) return;
    get(url, config);
  }, [url, config]);

  return { data, loading, error, get };
}

export default useFetch;
