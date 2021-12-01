import { gql } from '@apollo/client'

const updateUser = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            name
            address
            description
            updatedAt
        }
    }
`

export { updateUser }
