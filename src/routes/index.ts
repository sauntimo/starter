
import { Request, Response, Router } from 'express';

import { ExampleService } from '../services/ExampleService';

// Init router and path
const router = Router();
const exampleService = new ExampleService();

/**
 * Get greeting for a given date
 * "GET /api/greet/:name"
 * @param {string} name a name to greet 
 */
router.get('/greet/:name', (req: Request, res: Response): void => {
    const {statusCode, ...response} = exampleService.greet(req.params.name);
    res.status(statusCode).json(response);
});


/**
 * Get 10 random people
 * "GET /api/random-people"
 */
router.get('/random-people', async (req: Request, res: Response): Promise<void> => {
    const {statusCode, ...response} = await exampleService.getRandomPeople();
    res.status(statusCode).json(response);
});


export default router;
