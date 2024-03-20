import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017/harry-potter';
const client = new MongoClient(uri);

let db: Db;

export async function connectToMongoDB(): Promise<void> {
    try {
        await client.connect();
        console.log('Conectado a la base de datos MongoDB');
        db = client.db();
    } catch (error) {
        console.error('Error al conectar a la base de datos MongoDB:', error);
        throw error;
    }
}

export { db };