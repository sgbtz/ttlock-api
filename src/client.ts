import fetch from 'node-fetch'

import type { ClientType } from './types'

export default class Client {
    data?: ClientType

    constructor(data: ClientType) {
        this.data = data
    }

    async request<T = unknown>(endpoint: string, parameters: any, isOauth = true): Promise<T> {
        const { clientId } = this.data!

        const body = parameters

        if (isOauth) {
            body['client_id'] = clientId
        } else {
            body['clientId'] = clientId
        }

        const response = await fetch(`${this.data?.baseUrl}${endpoint}?clientId=${clientId}&accessToken=${parameters.accessToken}&${objectToQueryString(body)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(body)
        })
        const responseJSON = await response.json()
        if (this.data?.debug) {
            console.log(`RESPONSE ${response.status}/${response.statusText}: ${JSON.stringify(responseJSON, null, 2)}`)
        }

        return responseJSON
    }
}

function objectToQueryString(obj: any) {
    const queryString = [];
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        // Ensure the value is properly encoded
        const encodedValue = encodeURIComponent(value);
        // Add the key-value pair to the query string array
        queryString.push(`${key}=${encodedValue}`);
      }
    }
  
    // Join the key-value pairs with "&" to form the complete query string
    return queryString.join('&');
  }