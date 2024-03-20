import { User } from '../models/user';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { IUserService } from '../../interfaces/services/IUserService';
import { v4 as uuidv4 } from 'uuid';

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.getAllUsers();
            return users;
        } catch (error) {
            throw new Error('Error al obtener usuarios');
        }
    }

    async insertUser(name: string, incantation: string, effect: string, canBeVerbal: boolean, type: string, light: string, creator: string ): Promise<User> {
        try {
            if (light !== 'Blue' && light !== 'Red') {
                throw new Error('El campo "light" solo puede ser "Blue" o "Red"');
            }
            
            const user: User = {
                id: uuidv4(), 
                name: name,
                incantation: incantation,
                effect: effect,
                canBeVerbal: canBeVerbal,
                type: type,
                light: light,
                creator: creator

            };
            const insertedUser = await this.userRepository.insertUser(user);
            return insertedUser;
        } catch (error) {
            throw new Error('Error al insertar usuario');
        }
    }
}