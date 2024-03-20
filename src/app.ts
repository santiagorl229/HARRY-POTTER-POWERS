
import { connectToMongoDB } from './infraestructure/database/mongoDB';
import { expressAdapter } from './adapters/expressAdapter';
import { UserService } from './domain/services/userServices';
import { UserRepository } from './domain/repositories/userRepository';

async function startServer() {
    await connectToMongoDB();

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const app = expressAdapter(userService);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

startServer().catch(err => {
    console.error('Error starting server:', err);
});

