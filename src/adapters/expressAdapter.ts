import express, { Request, Response } from 'express';
import { IUserService } from '../interfaces/services/IUserService';

export function expressAdapter(userService: IUserService) {
    const app = express();

    app.use(express.json());

    app.get('/harrypotter/Spells', async (req: Request, res: Response) => {
        
        const { Type, light } = req.query;
        try {

            if (typeof Type !== 'string' || typeof light !== 'string') {
                throw new Error('Los parámetros Type y light son obligatorios');
            }
            const filteredCharacters = await userService.getCharactersBySpellAndLight(Type, light);

            res.json(filteredCharacters);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    });

    app.get('/users', async (req: Request, res: Response) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    });
    
    app.post('/users', async (req: Request, res: Response) => {
        const { name, incantation, effect, canBeVerbal, type, light, creator } = req.body;
        try {
            const insertedUser = await userService.insertUser(name, incantation, effect, canBeVerbal, type, light, creator);
            res.status(201).json(insertedUser);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    });

    return app;
}