import { IUser } from "./auth";

export interface IRoom {
  _id: string;
  code: string;
  owner: IUser;
  users: IUser[];
  board: string[][];
  currentPlayer: IUser;
  currentWord: string;
  state: {
    attempt: number;
    letterPosition: number;
  };
  wordLength: number;
  timePerRound: number;
  numberOfHits: number;
  rounds: number;
}

export interface IRoomSocketInfo {}
