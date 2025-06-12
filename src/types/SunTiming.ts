/** The detailed sun timing data for a given date and location */
export interface SunTimingResults {
  /** Calendar date in YYYY-MM-DD format */
  date: string;
  /** Time of sunrise (e.g. "5:43:36 AM") */
  sunrise: string;
  /** Time of sunset (e.g. "8:35:14 PM") */
  sunset: string;
  /** Time of first light (e.g. "3:45:20 AM") */
  first_light: string;
  /** Time of last light (e.g. "10:33:30 PM") */
  last_light: string;
  /** Time of dawn (e.g. "5:11:39 AM") */
  dawn: string;
  /** Time of dusk (e.g. "9:07:11 PM") */
  dusk: string;
  /** Time of solar noon (e.g. "1:09:25 PM") */
  solar_noon: string;
  /** Time marking the golden hour (e.g. "7:55:24 PM") */
  golden_hour: string;
  /** Total length of the day in HH:MM:SS format */
  day_length: string;
  /** IANA timezone identifier */
  timezone: string;
  /** UTC offset in minutes (e.g. -240 for UTC−04:00) */
  utc_offset: number;
}

/** The top-level response returned by the API */
export interface SunTimingApiResponse {
  results: SunTimingResults;
  /** Status of the request (e.g. "OK", "ERROR") */
  status: string;
}

/**
 * The request body for the getSunriseSunset API
 */
export interface SunTimingApiRequest {
  /**
   * (Required): Latitude of the location in decimal degrees. Example: 38.907192
   */
  readonly lat: number;
  /**
   * (Required): Longitude of the location in decimal degrees. Example: -77.03687
   */
  readonly lng: number;
  /**
   * Date in YYYY-MM-DD format, you can also specify relative formats such as “today” and “tomorrow”. If not set it’ll default to today.
   */
  readonly date?: string;
  /**
   * (Optional): Set a timezone of the returned times (timezone list). By default the API will return the times in the location’s timezone. If SunriseSunset cannot validate a timezone it’ll fallback to the default which is the location’s timezone. Example: UTC
   */
  readonly timezone?: string; // timezone in IANA format
  /**
   *  Date in YYYY-MM-DD format to specify a range, date_start will be used as a start date.
   */
  readonly date_start?: string; // date in YYYY-MM-DD format
  /**
   * (Optional): Date in YYYY-MM-DD format used to specify the end of a date range. If this is left empty and date_start is set it’ll default to the current day.
   */
  readonly date_end?: string;
  /**
   * (Optional): Format that all the times are displayed in. Default is a 12-hour clock but acceptable values include “24” for a 24-hour clock, “military” for military time, and “unix” for unix timestamps. Note that unix timestamps are only returned in UTC.
   */
  readonly time_format?: '24' | '12' | 'military' | 'unix';
}
