import { HTTPMethod, RequestWrapper } from "../utilities/http";

export interface OptionArguments {
    [arg: string]: string | number,
}

export interface Option {
  arguments?: OptionArguments;
  body?: string;
  onResolve?: (response: object) => unknown;
  onReject?: (error: object) => unknown; 
}

type RequestFunc = (option?: Option) => void;

export interface Resource {
  getReq: RequestFunc
  postReq: RequestFunc;
  putReq: RequestFunc;
  deleteReq: RequestFunc;
  beforeEach: (callback: (req: object, res: object) => unknown) => Resource;
  afterEach: (callback: (req: object, res: object) => unknown) => Resource;
  extend: (funcName: string, method: HTTPMethod, path: string) => Resource;
  otherReq: { [callName: string]: unknown };
  _afterEach: Function;
  _requestHandler: (request: RequestWrapper) => () => Promise<unknown>;
  _beforeEach: Function;
}