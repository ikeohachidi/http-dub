import { RequestWrapper } from "../utilities/http";

export interface OptionArguments {
    [arg: string]: string | number,
}

export interface Option {
  arguments?: OptionArguments;
  body?: string;
  onResolve: (response: object) => unknown;
  onReject: (error: object) => unknown; 
}

type RequestFunc = (option?: Option) => unknown;

export interface Resource {
  getReq: RequestFunc
  postReq: RequestFunc;
  putReq: RequestFunc;
  deleteReq: RequestFunc;
  beforeEach: (callback: (req: object, res: object) => unknown) => Resource;
  afterEach: (callback: (req: object, res: object) => unknown) => Resource;
  extend: (callName: string, callback: (option?: Option) => unknown) => Resource;
  otherReq: { [callName: string]: RequestFunc };
  _afterEach: Function;
  _requestHandler: (request: RequestWrapper) => unknown;
  _beforeEach: Function;
}