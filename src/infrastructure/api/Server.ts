import dotenv from 'dotenv';
import 'module-alias/register';
dotenv.config();
import { application } from './Application';
import { createDependencyContainer } from '@configuration';
import { dependenciasIdempotencia } from 'cm-idempotencia';

const start = async () => {
    const port = process.env.PORT ?? 8080;
    try {
        await application.listen(port, '0.0.0.0');
        application.swagger();
        createDependencyContainer();
        dependenciasIdempotencia();
    } catch (error) {
        console.error(error);
        await application.close();
    }
};
start();
