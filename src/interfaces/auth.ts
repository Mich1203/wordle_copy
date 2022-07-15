export interface IUser {
  _id: string;
  email: string;
  name: string;
  username: string;
  phoneNumber: string;
  isVerified: boolean;
  country: string;
  profileImg: string;
}

export interface IUserResponse {
  user: IUser;
  token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
  username: string;
  country: string;
  phoneNumber: string;
}

export interface IVerifyRequest {
  otp: string;
}

export interface IVerifyResponse {
  valid: boolean;
  status: "approved" | "rejected" | "cancelled";
}
