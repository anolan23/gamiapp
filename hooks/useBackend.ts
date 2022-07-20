import { useEffect, useState } from 'react';
import backend from '../lib/backend';

function useBackend<T>(url: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const get = async function (url: string) {
    try {
      setLoading(true);
      const response = await backend.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get(url);
  }, [url]);

  return { data, loading, error };
}

export default useBackend;
