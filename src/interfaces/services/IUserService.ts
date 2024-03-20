import { User } from '../../domain/models/user';

export interface IUserService {
    getAllUsers(): Promise<User[]>;
    insertUser(name: string, incantation: string, effect: string, canBeVerbal: boolean, type: string, light: string, creator: string): Promise<User>;
    getCharactersBySpellAndLight(type: string, light: string): Promise<User[]>;
}

