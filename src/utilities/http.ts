import { HTTPMethod, Option } from "../types";

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

const httpRequest = <T>(method: HTTPMethod, path: string, option?: Option): Promise<T> => {
        const requestConfig: Record<string, unknown> = {
            method,
            body: option?.body,
            ...option?.config
        }

        return new Promise((resolve, reject) => {
            let statusCode = 200;
    
            return fetch(path, requestConfig)
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

export {
    httpRequest,
}