import type { IUser } from '../types/IUser.ts';

export interface IUserRepository {
  add(user: IUser): Promise<string>;
  get(id: string): Promise<IUser | undefined>;
  getAll(skip: number, take: number): Promise<IUser[]>;
  delete(id: string): Promise<void>;
}

export interface IImageRepository {
  get(resource: string): Promise<string>;
}
