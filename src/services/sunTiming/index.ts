import {
  SunTimingApiRequest,
  SunTimingApiResponse,
  SunTimingResults,
} from '../../types/SunTiming';

const API_URL = 'https://api.sunrisesunset.io/json';

/**
 * Fetch sun timing data from SunriseSunset.io
 * @param params – your query parameters
 * @returns the `results` object on success
 * @throws on network error or non-OK status
 */
export async function getSunTiming(
  params: SunTimingApiRequest,
): Promise<SunTimingResults> {
  const queryParams = new URLSearchParams({
    lat: params.lat.toString(),
    lng: params.lng.toString(),
    ...(params.date && { date: params.date }),
    ...(params.timezone && { timezone: params.timezone }),
    ...(params.date_start && { date_start: params.date_start }),
    ...(params.date_end && { date_end: params.date_end }),
    ...(params.time_format && { time_format: params.time_format }),
  });

  const endpoint = `${API_URL}?${queryParams.toString()}`;

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) satisfies SunTimingApiResponse;

  if (data.status !== 'OK') {
    throw new Error(`API error: ${data.status}`);
  }

  return data.results;
}
