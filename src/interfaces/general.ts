export interface ApiResponse<T> {
  error: boolean;
  message: string;
  body: T;
}

export interface ICountry {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
}
