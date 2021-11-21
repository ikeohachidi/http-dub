export interface OptionArguments {
		[arg: string]: string | number,
}

export interface Option {
	arguments?: OptionArguments;
	body?: string;
	config?: RequestConfig;
	onResolve?: (response: object) => unknown;
	onReject?: (error: object) => unknown; 
}

export type RequestFunc = (option?: Option) => void;

export interface Resource {
	getReq: RequestFunc
	postReq: RequestFunc;
	putReq: RequestFunc;
	deleteReq: RequestFunc;
	beforeEach: (callback: (req: object) => unknown) => Resource;
	afterEach: (callback: (req: object, res: object) => unknown) => Resource;
	extend: (funcName: string, method: HTTPMethod, path: string) => Resource;
	otherReq: { [callName: string]: unknown };
	_afterEach: Function;
	_beforeEach: Function;
	_requestHandler: (request: RequestWrapper) => () => Promise<unknown>;
}

export enum HTTPMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}

export interface RequestWrapper {
	path: string;
	method: HTTPMethod;
	option?: Option;
}

export interface RequestConfig {
	mode?: "cors" | "no-cors" | "same-origin",
	cache?: "no-cache" | "reload" | "force-cache" | "only-if-cached",
	credentials?: "same-origin" | "include",
	headers?: {[header: string]: string},
	redirect?: "follow" | "manual" | "error",
	referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" |  "unsafe-url",
}