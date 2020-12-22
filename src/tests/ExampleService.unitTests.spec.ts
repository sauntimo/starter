import { StatusCodes } from 'http-status-codes';

import { ExampleService } from '../services/ExampleService';
import {
    IApiResponse,
    ISuccessResponse,
  } from '../common/types';

const exampleService = new ExampleService;

let received: IApiResponse<string> | undefined;
let error: Error | undefined;

// eslint-disable-next-line max-len
const successMessageRE = /^Successfully generated greeting\./;
const badNameMessageRE = /^Invalid name./;
const exampleName = 'Tim';
describe('calculateDates', () => {

    beforeEach(() => {
        received = undefined;
        error = undefined;
    });

    describe('Bad input', () => {
        it('should return failed on bad name', () => {
            try {
                received = exampleService.greet(1 as any as string); 
            } catch(e) {
                error = e;
            }

            expect(error).toBe(undefined);
            expect(received).toHaveProperty('success', false);
            expect(received).toHaveProperty('message', expect.stringMatching(badNameMessageRE));
            expect(received).toHaveProperty('statusCode', StatusCodes.BAD_REQUEST);
            expect(received).not.toHaveProperty('data');
        });
    });

    describe('Functionality', () => {
        it(`should return a greeting for a given name`, () => {
            try {
                received = exampleService.greet(exampleName); 
            } catch(e) {
                error = e;
            }

            expect(error).toBe(undefined);
            expect(received).toHaveProperty('success', true);
            expect((received as ISuccessResponse<string>)).toHaveProperty(
                'data',
                `Hello, ${exampleName}.`
            );
        });

    });

    describe('Greetings', () => {
        test.each`
            name
            ${'Tim'}
            ${'James'}
            ${'Sarah'}
            ${'Rachel'}
        `(
            'should return a greeting for $name',
            ({name}: {[key: string]: string}) => {
                try {
                    received = exampleService.greet(name); 
                } catch(e) {
                    error = e;
                }

                expect(error).toBe(undefined);
                expect(received).toHaveProperty('success', true);
                expect(received).toHaveProperty(
                    'message',
                    expect.stringMatching(successMessageRE)
                );
                expect(typeof (received as ISuccessResponse<string>).data).toEqual('string');
                expect((received as ISuccessResponse<string>).data).toEqual(`Hello, ${name}.`);
                expect(received).toHaveProperty('statusCode', StatusCodes.OK);
            }
        );
    });

});
