import React from 'react'
import { fireEvent, render, screen } from 'utils/testUtils'
import { MockedProvider } from '@apollo/client/testing'
import UserCard, { UserCardProps } from './UserCard'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}))

const setup = () => {
    const userProps: UserCardProps = {
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

    return { userProps }
}

test('When User Card renders should show user avatar', () => {
    const { userProps } = setup()

    render(
        <MockedProvider>
            <UserCard {...userProps} />
        </MockedProvider>
    )

    const image = screen.getByAltText('Fake Name')

    expect(image).toHaveAttribute('src', 'fake_url')
})

test('When User Card renders should show user name in uppercase', () => {
    const { userProps } = setup()

    render(
        <MockedProvider>
            <UserCard {...userProps} />
        </MockedProvider>
    )

    expect(screen.getByText('FAKE NAME')).toBeInTheDocument()
})

test('When User Card renders should show user description', () => {
    const { userProps } = setup()

    render(
        <MockedProvider>
            <UserCard {...userProps} />
        </MockedProvider>
    )

    expect(screen.getByText('description')).toBeInTheDocument()
})

test('When user click on edit should show a modal', () => {
    const { userProps } = setup()

    render(
        <MockedProvider>
            <UserCard {...userProps} />
        </MockedProvider>
    )

    const editButton = screen.getByTitle('Edit User')

    fireEvent.click(editButton)

    expect(screen.getByText('Edit user')).toBeInTheDocument()
})

test('When user click on edit should show a modal with user data', () => {
    const { userProps } = setup()

    render(
        <MockedProvider>
            <UserCard {...userProps} />
        </MockedProvider>
    )

    const editButton = screen.getByTitle('Edit User')
    fireEvent.click(editButton)

    const name = screen.getByLabelText('Name') as HTMLInputElement
    const address = screen.getByLabelText('Location') as HTMLInputElement
    const description = screen.getByLabelText('Description') as HTMLInputElement

    expect(name.value).toBe(userProps.user.name)
    expect(address.value).toBe(userProps.user.address)
    expect(description.value).toBe(userProps.user.description)
})

test('When user click on close modal should make modal dissapear', () => {
    const { userProps } = setup()

    render(
        <MockedProvider>
            <UserCard {...userProps} />
        </MockedProvider>
    )

    const editButton = screen.getByTitle('Edit User')
    fireEvent.click(editButton)

    const cancelButton = screen.getByRole('button', {
        name: 'Cancel',
    })
    fireEvent.click(cancelButton)

    expect(screen.queryByText('Edit user')).not.toBeInTheDocument()
})
