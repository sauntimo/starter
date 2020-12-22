import { StatusCodes } from 'http-status-codes';
export interface IApiResponseBase {
    success: boolean;
    message: string;
    statusCode: StatusCodes;
  }

  export interface ISuccessResponse<T> extends IApiResponseBase {
    success: true;
    data: T;
    statusCode: StatusCodes.OK;
  }

  export interface IFailResponse extends IApiResponseBase {
    success: false;
    statusCode: StatusCodes.BAD_REQUEST | StatusCodes.INTERNAL_SERVER_ERROR;
  }

  export type IApiResponse<T> = ISuccessResponse<T> | IFailResponse

