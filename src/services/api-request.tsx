export default class ApiRequest {
  static async get<T>(requestInfo: RequestInfo, tenant?: string): Promise<T> {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    if (tenant) {
      requestHeaders.append('companyId', tenant);
    }

    const options = {
      method: 'GET',
      headers: requestHeaders
    };

    try {
      return await fetch(requestInfo, options)
        .then(this.checkStatus)
        .then<T>(this.parseJSON);
    } catch (responseError) {
      console.log(responseError); // eslint-disable-line no-console
      throw responseError;
    }
  }

  static async post<T>(
    requestInfo: RequestInfo,
    requestBody: T,
    tenant?: string
  ): Promise<T> {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    if (tenant) {
      requestHeaders.append('companyId', tenant);
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: requestHeaders
    };

    try {
      return await fetch(requestInfo, options)
        .then(this.checkStatus)
        .then<T>(this.parseJSON);
    } catch (responseError) {
      console.log(responseError); // eslint-disable-line no-console
      throw responseError;
    }
  }

  static async put<T>(
    requestInfo: RequestInfo,
    requestBody: T,
    tenant?: string
  ): Promise<T> {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    if (tenant) {
      requestHeaders.append('companyId', tenant);
    }

    const options = {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: requestHeaders
    };

    try {
      return await fetch(requestInfo, options)
        .then(this.checkStatus)
        .then<T>(this.parseJSON);
    } catch (responseError) {
      console.log(responseError); // eslint-disable-line no-console
      throw responseError;
    }
  }

  static async delete(
    requestInfo: RequestInfo,
    tenant?: string
  ): Promise<Response> {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    if (tenant) {
      requestHeaders.append('companyId', tenant);
    }

    const options = {
      method: 'DELETE',
      headers: requestHeaders
    };

    try {
      return await fetch(requestInfo, options).then(this.checkStatus);
    } catch (responseError) {
      console.log(responseError); // eslint-disable-line no-console
      throw responseError;
    }
  }

  static checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    // Need some sort of ApiError based on API responses found in http://app-general-ledger-service-devtest.azurewebsites.net/swagger/index.html
    // {
    //   "type": "string",
    //   "title": "string",
    //   "status": 0,
    //   "detail": "string",
    //   "instance": "string",
    //   "errors": {
    //     "additionalProp1": [
    //       "string"
    //     ],
    //     "additionalProp2": [
    //       "string"
    //     ],
    //     "additionalProp3": [
    //       "string"
    //     ]
    //   }
    // }

    // {
    //   "message": "string"
    // }
    const error = new Error(`HTTP Error ${response.statusText}`);
    console.log(error); // eslint-disable-line no-console
    throw error;
  }

  static parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }
}

export function isError<T>(input: T | Error): input is Error {
  return (input as Error).message !== undefined;
}
