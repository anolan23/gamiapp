import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/dist/types';
import backend from '../lib/backend';

function useBackendSWR<T>(
  url?: string,
  config?: AxiosRequestConfig,
  swrConfig?: Partial<PublicConfiguration<T, any, BareFetcher<T>>>
) {
  async function fetcher(url: string) {
    const response = await backend.get<T>(url, config);
    return response.data;
  }

  return useSWR<T>(url ?? null, fetcher, swrConfig);
}

export default useBackendSWR;
