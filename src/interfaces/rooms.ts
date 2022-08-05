import { IUser } from "./auth";

export interface IPlayer {
  user: IUser;
  score: number;
}
export interface IRoom {
  _id: string;
  code: string;
  owner: IUser;
  players: IPlayer[];
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
