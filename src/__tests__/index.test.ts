import { createClient } from '../'
import { describe, expect, it } from '@jest/globals'
import type { LockType } from '../types'

const client = createClient({
    baseUrl: 'https://euapi.sciener.com',
    clientId: '7b65d09fd26a451b95543cb2222c8c4b',
    clientSecret: 'e966ef53d983fc0e92dbf38cec8b94ed'
})
let accessToken:string
const date:number = new Date().getTime()

describe('Tests for createClient', () => {
    it('should store the configuration in the instance', async () => {
        const tokenData = await client.user.getAccessToken({ username: 'mahnaka@gmail.com', password: 'TTlock-2022' })
        accessToken = tokenData.access_token

        expect(client.data!.baseUrl).toBe('https://euapi.sciener.com')
        expect(client.data!.clientId).toBe('7b65d09fd26a451b95543cb2222c8c4b')
        expect(client.data!.clientSecret).toBe('e966ef53d983fc0e92dbf38cec8b94ed')
        expect(accessToken).not.toBeUndefined()
    })
})

describe('Lock Tests', () => {
    it('get locks', async () => {
        const data:LockType['List']['Response'] = await client.lock.list({ accessToken, pageNo: 1, pageSize: 1000, date })

        expect(data.list!).not.toHaveLength(0)
    })
})