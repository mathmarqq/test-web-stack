import { gql } from '@apollo/client'
import { User } from '../../../userManagement/models/User'

const findUsers = gql`
    query ($search: String, $page: Int, $limit: Int) {
        findUsers(search: $search, page: $page, limit: $limit) {
            items {
                id
                name
                dob
                address
                description
                createdAt
                updatedAt
            }
            totalItems
        }
    }
`

type FindUserType = {
    items: User[]
    totalItems: number
}

type FindUsersVars = {
    search?: string
    page?: number
    limit: number
}

type FindUsersResponse = {
    findUsers: FindUserType
}

export { findUsers }
export type { FindUserType, FindUsersResponse, FindUsersVars }
