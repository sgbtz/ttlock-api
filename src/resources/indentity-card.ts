import Client from '../client'
import type { IdentityCardType } from '../types'

type GetType = IdentityCardType['Get']
type DeleteType = IdentityCardType['Delete']
type ChangePeriodType = IdentityCardType['ChangePeriod']
type AddType = IdentityCardType['Add']
type ClearType = IdentityCardType['Clear']
type RenameType = IdentityCardType['Rename']

export default (client: Client) => ({
    get: (parameters: GetType['Parameters']): Promise<GetType['Response']> => {
        const endpoint = '/v3/identityCard/list'
    
        return client.request<GetType['Response']>(endpoint, parameters)
    },
    add: (parameters: AddType['Parameters']): Promise<AddType['Response']> => {
        // const endpoint = '/v3/identityCard/add'
        const endpoint = '/v3/identityCard/addForReversedCardNumber'

        return client.request<AddType['Response']>(endpoint, parameters)
    },
    delete: (parameters: DeleteType['Parameters']): Promise<DeleteType['Response']> => {
        const endpoint = '/v3/identityCard/delete'
    
        return client.request<DeleteType['Response']>(endpoint, parameters)
    },
    change: (parameters: ChangePeriodType['Parameters']): Promise<ChangePeriodType['Response']> => {
        const endpoint = '/v3/identityCard/changePeriod'
    
        return client.request<ChangePeriodType['Response']>(endpoint, parameters)
    },
    clear: (parameters: ClearType['Parameters']): Promise<ClearType['Response']> => {
        const endpoint = '/v3/identityCard/clear'

        return client.request<ClearType['Response']>(endpoint, parameters)
    },
    rename: (parameters: RenameType['Parameters']): Promise<RenameType['Response']> => {
        const endpoint = '/v3/identityCard/rename'

        return client.request<RenameType['Response']>(endpoint, parameters)
    },
})