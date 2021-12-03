import React from 'react'
import { render, screen } from 'utils/testUtils'
import UserGrid from './UserGrid'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}))

test('When user grid renders and location could not found should show a helper text', async () => {
    const users = [
        {
            id: 1,
            name: 'Fake Name',
            description: 'description',
            imgUrl: 'fake_url',
            createdAt: new Date(),
            address: 'address',
        },
        {
            id: 2,
            name: 'Fake Name 2',
            description: 'description 2',
            imgUrl: 'fake_url',
            createdAt: new Date(),
            address: 'address 2',
        },
    ]

    render(<UserGrid users={users} loading={false} onEdit={() => {}} />)

    expect(screen.getAllByTestId('card')).toHaveLength(2)
})

test('When user grid renders users could not found should show a helper text', async () => {
    render(<UserGrid users={[]} loading={false} onEdit={() => {}} />)

    expect(screen.getByText('We cannot find users :(')).toBeInTheDocument()
})

test('When user grid renders and is finding users should show loader', async () => {
    render(<UserGrid users={[]} loading onEdit={() => {}} />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
})
