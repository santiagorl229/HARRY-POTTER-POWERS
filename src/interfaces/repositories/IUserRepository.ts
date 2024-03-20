import { User } from '../../domain/models/user';

export interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    insertUser(user: User): Promise<User>;
    getCharactersBySpellAndLight(type: string, light: string): Promise<User[]>;
}