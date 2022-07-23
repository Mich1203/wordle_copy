import { IUser } from "./auth";

export interface IRoom {
  _id: string;
  code: string;
  owner: IUser;
  users: IUser[];
  wordLength: number;
  timePerRound: number;
  numberOfHits: number;
  rounds: number;
}
