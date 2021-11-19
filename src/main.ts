import { Option, Resource } from './types';
import { pathReplacer } from './utilities/path';
import { HTTPMethod, RequestWrapper, httpRequest } from './utilities/http';

const http = (path: string): Resource => {
	return {
		_requestHandler: function(request: RequestWrapper) {
		const { path, method, option, callback } = request;

			let fullPath = pathReplacer(path, option?.arguments);

			this._beforeEach();

			if (callback) {
				callback();
				return;
			}

			const pendingRequest = httpRequest({ 
				method,
				path: fullPath,
			}, option)

			Promise.allSettled([pendingRequest])
				.then(([req]) => {
					this._afterEach(req);
				})

			return pendingRequest;
		},
		getReq: function(option?: Option) {
			const handleArgs: RequestWrapper = {
				path,
				method: HTTPMethod.GET,
			}

			if (option) {
				handleArgs.option = option;
			}

			return this._requestHandler(handleArgs)
		},
		postReq: function(option?: Option) {
			return {};
		},
		putReq: function(option?: Option) {
			return {};
		},
		deleteReq: function(option?: Option) {
			return {};
		},
		otherReq: {},
		extend: function (callName: string, callback: (option?: Option) => Promise<unknown>)  {
			this.otherReq[callName] = this._requestHandler({
				method
			})
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

const req = http('https://jsonplaceholder.typicode.com/todos/1/bl')
	.afterEach((req: object) => {
		console.log('after equest', req)
	})
	.beforeEach((req: object) => {
		console.log('before request', req)
	})
	.extend('list-users', (option?: Option) => {
		console.log('hello world')
		return new Promise((resolve) => {
			resolve('all good')
		}); 
	})

// console.log(req.otherReq);
req.otherReq['list-users']();


// req.getReq({
// 	arguments: {
// 		'$1': "chidi",
// 		'$2': "ikeoha"
// 	},
// 	onResolve: (response: object) => {
// 		console.log('Successful Request');
// 		console.log(response);
// 	},
// 	onReject: (response: object) => {
// 		console.log('Bad Request');
// 		console.log(response);
// 	}
// })
