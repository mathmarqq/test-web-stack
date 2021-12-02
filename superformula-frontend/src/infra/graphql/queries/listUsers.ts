import { gql } from '@apollo/client'
import { User } from '../../../userManagement/models/User'

const listUsers = gql`
    query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                name
                dob
                address
                description
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`

type ListUsersQueryVariables = {
    filter?: {
        name?: {
            contains?: string
        }
    }
    limit?: number | null
    nextToken?: string | null
}

type ListUsersResponse = {
    listUsers: FindUserType
}

type FindUserType = {
    items: Array<User>
    nextToken?: string | null
}

export { listUsers }
export type { FindUserType, ListUsersResponse, ListUsersQueryVariables }
