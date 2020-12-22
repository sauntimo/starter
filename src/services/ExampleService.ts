import { StatusCodes } from 'http-status-codes';

import {
  IApiResponse,
  IFailResponse,
} from '../common/types';

export class ExampleService {

  /**
   * Takes a name and returns a greeting
   * @param name a name to greet
   */
  public greet = (
    name: string,
  ): IApiResponse<string> => {

    if (typeof name !== 'string' || name.length === 0) {
      return this.failReturn(
        `Invalid name. Please supply a name as text.`,
        true
      );
    }

    return {
      success: true,
      message: `Successfully generated greeting.`,
      data: `Hello, ${name}.`,
      statusCode: StatusCodes.OK,
    };
  }

  /**
   * helper fn for returning an error
   * @param message description of what went wrong
   */
  private readonly failReturn = (message: string, invalidInput = false): IFailResponse =>
    ({
        success: false,
        message,
        statusCode: invalidInput ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
    })
}
