import { Option, Resource } from './types';
import { pathReplacer } from './utilities/path';
import { HTTPMethod, RequestWrapper, httpRequest } from './utilities/http';

const http = (path: string): Resource => {
	return {
		_requestHandler: function(request: RequestWrapper) {
		const { path, method, option } = request;

			return () => {
				let fullPath = pathReplacer(path, option?.arguments);
				
				this._beforeEach();

				const pendingRequest = httpRequest({ 
					method,
					path: fullPath,
				}, option)
	
				Promise.allSettled([pendingRequest])
					.then(([req]) => {
						this._afterEach(req);
					})
	
				return pendingRequest;
			}
		},
		getReq: function(option?: Option) {
			const handleArgs: RequestWrapper = {
				path,
				method: HTTPMethod.POST,
			}

			if (option) {
				handleArgs.option = option;
			}

			const handler = this._requestHandler(handleArgs);
			handler();
		},
		postReq: function(option?: Option) {
			const handleArgs: RequestWrapper = {
				path,
				method: HTTPMethod.GET,
			}

			if (option) {
				handleArgs.option = option;
			}

			const handler = this._requestHandler(handleArgs);
			handler();
		},
		putReq: function(option?: Option) {
			const handleArgs: RequestWrapper = {
				path,
				method: HTTPMethod.PUT,
			}

			if (option) {
				handleArgs.option = option;
			}

			const handler = this._requestHandler(handleArgs);
			handler();
		},
		deleteReq: function(option?: Option) {
			const handleArgs: RequestWrapper = {
				path,
				method: HTTPMethod.DELETE,
			}

			if (option) {
				handleArgs.option = option;
			}

			const handler = this._requestHandler(handleArgs);
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