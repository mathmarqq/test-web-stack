import { gql } from '@apollo/client'

const updateUser = gql`
    mutation ($id: String!, $name: String, $address: String, $description: String) {
        updateUser(id: $id, name: $name, address: $address, description: $description) {
            id
            name
            address
            description
            updatedAt
        }
    }
`

export { updateUser }
