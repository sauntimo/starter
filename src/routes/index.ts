
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IApiResponse } from 'src/common/types';

import { ExampleService } from '../services/ExampleService';

// Init router and path
const router = Router();
const exampleService = new ExampleService();

type IResponse = Omit<IApiResponse<string>, 'statusCode'>;
interface IResponseData {
    statusCode: StatusCodes,
    response: IResponse,
}

/**
 * Get greeting for a given date
 * "GET /api/greet/:name"
 * @param {string} name a name to greet 
 */
router.get('/:name', (req: Request, res: Response): void => {
    const {statusCode, ...response} = exampleService.greet(req.params.name);
    res.status(statusCode).json(response);
});

export default router;
