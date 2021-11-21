import { HTTPMethod, Option, RequestConfig, RequestWrapper, Resource } from './types';
import { pathReplacer } from './utilities/path';
import { httpRequest } from './utilities/http';

const http = (path: string, requestConfig?: RequestConfig): Resource => {
	return {
		_requestHandler: function(request: RequestWrapper) {
			const { path, method, option } = request;

			return () => {
				let fullPath = pathReplacer(path, option?.arguments);
				
				this._beforeEach();

				const pendingRequest = httpRequest(method, fullPath, {
					...option,
					config: {
						...requestConfig,
						...option?.config
					}
				});
	
				Promise.allSettled([pendingRequest])
					.then(([req]) => {
						this._afterEach(req);
					})
	
				return pendingRequest;
			}
		},
		getReq: function(option?: Option) {
			const handler = this._requestHandler({
				path,
				option,
				method: HTTPMethod.GET,
			});

			handler();
		},
		postReq: function(option?: Option) {
			const handler = this._requestHandler({
				path,
				option,
				method: HTTPMethod.POST,
			});

			handler();
		},
		putReq: function(option?: Option) {
			const handler = this._requestHandler({
				path,
				option,
				method: HTTPMethod.PUT,
			});

			handler();
		},
		deleteReq: function(option?: Option) {
			const handler = this._requestHandler({
				path,
				option,
				method: HTTPMethod.DELETE,
			});

			handler();
		},
		otherReq: {},
		extend: function (funcName: string, method: HTTPMethod, addedPath: string)  {
			this.otherReq[funcName] = (option: Option) => {
				const handler = this._requestHandler({
					method,
					option,
					path: path + `/${addedPath}`,
				});

				handler();
			}

			return this;
		},
		beforeEach(callback: (req: object, res: object) => unknown) {
			this._beforeEach = callback;
			return this;
		},
		afterEach(callback: (req: object, res: object) => unknown) {
			this._afterEach = callback;
			return this;
		},
		_beforeEach: function(req: object) {},
		_afterEach: function(req: object, res: object) {},
	}
}

export default http;