import { gql } from '@apollo/client'

export const getLocation = gql`
    query GetLocation($address: String!) {
        getLocation(address: $address) {
            latitude
            longitude
        }
    }
`

export type GetLocationQueryVariables = {
    address: string
}

export type GetLocationResponse = {
    getLocation: {
        latitude: number
        longitude: number
    }
}
