import React from 'react'
import { render, screen } from '../../../testUtils/testUtils'
import UserCard from './UserCard'
import { UserCardProps } from './UserCard.types'

test('When User Card renders should show user avatar', () => {
    const user: UserCardProps = {
        user: {
            id: 1,
            name: 'Fake Name',
            description: 'description',
            imgUrl: 'fake_url',
            createdAt: new Date(),
            address: 'address',
        },
        onEdit: () => {},
    }

    render(<UserCard {...user} />)

    const image = screen.getByAltText('Fake Name')

    expect(image).toHaveAttribute('src', 'fake_url')
})

test('When User Card renders should show user name in uppercase', () => {
    const user: UserCardProps = {
        user: {
            id: 1,
            name: 'Fake Name',
            description: 'description',
            imgUrl: 'fake_url',
            createdAt: new Date(),
            address: 'address',
        },
        onEdit: () => {},
    }

    render(<UserCard {...user} />)

    expect(screen.getByText('FAKE NAME')).toBeInTheDocument()
})

test('When User Card renders should show user description', () => {
    const user: UserCardProps = {
        user: {
            id: 1,
            name: 'Fake Name',
            description: 'description',
            imgUrl: 'fake_url',
            createdAt: new Date(),
            address: 'address',
        },
        onEdit: () => {},
    }

    render(<UserCard {...user} />)

    expect(screen.getByText('description')).toBeInTheDocument()
})

test('When User Card is hovered should show user creation date', () => {
    const user: UserCardProps = {
        user: {
            id: 1,
            name: 'Fake Name',
            description: 'description',
            imgUrl: 'fake_url',
            createdAt: new Date('Sun Nov 28 2021 23:47:40 GMT-0300'),
            address: 'address',
        },
        onEdit: () => {},
    }

    render(<UserCard {...user} />)

    expect(screen.getByText('28 Nov 2021')).toBeInTheDocument()
})
