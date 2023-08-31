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

        const response = await fetch(`${this.data?.baseUrl}${endpoint}`, {
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