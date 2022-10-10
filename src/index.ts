import Client from "./client"

import user from "./resources/user"
import lock from "./resources/lock"
import ekey from "./resources/ekey"
import passcode from "./resources/passcode"
import identityCard from "./resources/indentity-card"
import gateway from "./resources/gateway"
import unlockRecords from "./resources/unlock-records"
import type { ClientType } from "./types"

export * from "./types"

export function createClient(parameters: ClientType) {
  const client = new Client(parameters)

  const { data } = client

  const api = {
    data,
    user: user(client),
    lock: lock(client),
    ekey: ekey(client),
    passcode: passcode(client),
    identityCard: identityCard(client),
    gateway: gateway(client),
    unlockRecords: unlockRecords(client)
  }

  return api
}
