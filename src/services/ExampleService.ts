import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';

import {
  IApiResponse,
  IFailResponse,
} from '../common/types';
import { response } from 'express';

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

  /**
   * Takes a name and returns a greeting
   * @param name a name to greet
   */
  public getRandomPeople = async (): Promise<IApiResponse<any>> => {

    const data = {
      token: process.env.FAKEJSON_TOKEN,
      parameters: {
        code: 200
      },
      data: {
        first_name: 'nameFirst',
        last_name: 'nameLast',
        user_email: 'internetEmail',
        _repeat: 10
      }
    }

    return this.getExternalResource<any>(
      'https://app.fakejson.com/q',
      {},
      data,
      'POST',
    );
  }

  /**
   * make an external xhr request and return the result
   * @param 
   */
  private readonly getExternalResource = async <T>(
    url: string,
    headers: {[key: string]: string},
    body: any,
    method = 'GET',
  ): Promise<IApiResponse<T>> => {

    headers['Content-Type'] = 'application/json';
    const settings = {method, headers, body: JSON.stringify(body)};
    const response = await fetch(url, settings);
    const responseJson = await response.json();

    if (!response.ok) {
      return this.failReturn(`Failed to get external resource "${url}"`);
    }

    return {
      success: true,
      message: `retrieved external resource`,
      data: responseJson,
      statusCode: StatusCodes.OK,
    }
  }
}
