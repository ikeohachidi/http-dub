import { Option } from "../types";
import { pathReplacer } from "./path";

enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

interface ResourceRequest {
    method: HTTPMethod;
    path: string;
    body?: string; 
}

const responseAction = (httpResponse: Response) => {
    const contentType = httpResponse.headers.get("content-type");

    if (contentType === 'application/json') {
        return httpResponse.json();
    }

    if (contentType?.includes('image') || contentType?.includes("video")) {
        return httpResponse.blob();
    }

    return httpResponse.text();
} 

const httpRequest = <T>(request: ResourceRequest, option?: Option): Promise<T> => {
        const { method, path, body } = request;

        const requestOptions: Record<string, unknown> = {
            method,
            credential: 'include',
        }
        if (body) {
            requestOptions.body = body;
        }

        return new Promise((resolve, reject) => {
            let statusCode = 200;
    
            return fetch(path, requestOptions)
            .then((response) => {
                statusCode = response.status;
                return responseAction(response);
            })
            .then(body => {
                if (statusCode >= 200 && statusCode < 300) {
                    if (option?.onResolve) {
                        option?.onResolve(body);
                    }
                    resolve(body);
                } else {
                    if (option?.onReject) {
                        option?.onReject(body);
                    }
                    reject(body)
                }
            })
            .catch(error => {
                if (option?.onReject) {
                    option?.onReject(error)
                }
    
                reject(error);
            })
        });
}

interface RequestWrapper {
    path: string;
    method: HTTPMethod;
    option?: Option;
}

export {
    HTTPMethod,
    RequestWrapper,
    httpRequest,
}