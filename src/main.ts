import { HTTPMethod, Option, RequestConfig, RequestWrapper, Resource } from './types';
import { pathReplacer } from './utilities/path';
import { httpRequest } from './utilities/http';

const http = (path: string, requestConfig?: RequestConfig): Resource => {
	let _beforeEach = function() {};
	let _afterEach = function(response: object) {};

	const _requestHandler = function<T>(request: RequestWrapper): () => Promise<T> {
		const { path, method, option } = request;

		return () => {
			let fullPath = pathReplacer(path, option?.arguments);
			
			_beforeEach();

			const pendingRequest = httpRequest<T>(method, fullPath, {
				...option,
				config: {
					...requestConfig,
					...option?.config
				}
			});

			Promise.allSettled([pendingRequest])
				.then(([req]) => {
					_afterEach(req);
				})

			return pendingRequest;
		}
	}

	return {
		getReq: function(option?: Option) {
			const handler = _requestHandler({
				path,
				option,
				method: HTTPMethod.GET,
			});

			handler();
		},
		postReq: function(option?: Option) {
			const handler = _requestHandler({
				path,
				option,
				method: HTTPMethod.POST,
			});

			handler();
		},
		putReq: function(option?: Option) {
			const handler = _requestHandler({
				path,
				option,
				method: HTTPMethod.PUT,
			});

			handler();
		},
		deleteReq: function(option?: Option) {
			const handler = _requestHandler({
				path,
				option,
				method: HTTPMethod.DELETE,
			});

			handler();
		},
		otherReq: {},
		extend: function (funcName: string, method: HTTPMethod, addedPath: string)  {
			this.otherReq[funcName] = (option: Option) => {
				const handler = _requestHandler({
					method,
					option,
					path: path + `/${addedPath}`,
				});

				handler();
			}

			return this;
		},
		beforeEach(callback: () => unknown) {
			_beforeEach = callback;
			return this;
		},
		afterEach(callback: (res: object) => unknown) {
			_afterEach = callback;
			return this;
		},
	}
}

export default http;