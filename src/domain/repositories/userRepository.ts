import { User } from '../models/user';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { db, connectToMongoDB } from '../../infraestructure/database/mongoDB';
import { Db, Collection } from 'mongodb';

export class UserRepository implements IUserRepository {
    private usersCollection: Collection<User> | null = null;

    constructor() {
        connectToMongoDB()
            .then(() => {
                console.log('Conexión a MongoDB establecida correctamente');
                this.usersCollection = db.collection<User>('User');
            })
            .catch(error => {
                console.error('Error al conectar a MongoDB:', error);
            });
    }
    async getCharactersBySpellAndLight(type: string, light: string): Promise<User[]> {
        try {

            const documents = await db.collection('User').find({ type, light }).toArray();
            const users: User[] = documents.map((doc: any) => ({
                id: doc.id,
                name: doc.name,
                incantation: doc.incantation,
                effect: doc.effect,
                canBeVerbal: doc.canBeVerbal,
                type: doc.type,
                light: doc.light,
                creator: doc.creator

            }));

            return users;
        } catch (error) {
            throw new Error('Error al obtener personajes filtrados');
        }
    }

    async getAllUsers(): Promise<User[]> {
        if (!this.usersCollection) {
            throw new Error('La conexión a MongoDB no está establecida');
        }

        try {
            const usersData = await this.usersCollection.find().toArray();
            const users: User[] = usersData.map((userData: any) => {
                const user: User = {
                    id: userData.id,
                    name: userData.name,
                    incantation: userData.incantation,
                    effect: userData.effect,
                    canBeVerbal: userData.effect,
                    type: userData.type,
                    light: userData.light,
                    creator: userData.creator
                };
                return user;
            });
            return users;
        } catch (error) {
            throw new Error('Error al obtener usuarios');
        }
    }

    async insertUser(user: User): Promise<User> {
        if (!this.usersCollection) {
            throw new Error('La conexión a MongoDB no está establecida');
        }

        try {
            const result = await this.usersCollection.insertOne(user);
            return user;
        } catch (error) {
            throw new Error('Error al insertar usuario');
        }
    }
}