import { MockedProvider } from '@apollo/client/testing'
import { updateUser } from 'infra/graphql/mutations'
import React from 'react'
import { fireEvent, render, screen, waitFor } from 'testUtils/testUtils'
import { getLocation } from 'infra/graphql/queries'
import EditModal, { EditModalProps } from './EditModal'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}))

const setup = () => {
    const onSaveSpy = jest.fn()
    const onCloseSpy = jest.fn()

    const modalProps: EditModalProps = {
        user: {
            id: 1,
            name: 'Fake Name',
            description: 'description',
            imgUrl: 'fake_url',
            createdAt: new Date(),
            address: 'address',
        },
        onSave: onSaveSpy,
        onClose: onCloseSpy,
    }

    return { modalProps, onCloseSpy, onSaveSpy }
}

const getGetLocationQueryMock = () => {
    const getLocalizationMock = {
        request: {
            variables: {
                address: 'address',
            },
            query: getLocation,
        },
        result: {
            data: {
                getLocation: {
                    latitude: 0,
                    longitude: 0,
                },
            },
        },
    }

    return { getLocalizationMock }
}

const getUpdateMutationMock = () => {
    const updateUserMock = {
        request: {
            variables: {
                input: {
                    id: 1,
                    name: 'Fake Name',
                    address: 'address',
                    description: 'description',
                },
            },
            query: updateUser,
        },
        result: {
            data: {
                updateUser: {
                    id: 1,
                    name: 'Fake Name',
                    address: 'address',
                    description: 'description',
                    updatedAt: new Date(),
                },
            },
        },
    }

    return { updateUserMock }
}

test('When user modal renders should show user data', () => {
    const { modalProps } = setup()

    render(
        <MockedProvider>
            <EditModal {...modalProps} />
        </MockedProvider>
    )

    const name = screen.getByLabelText('Name') as HTMLInputElement
    const address = screen.getByLabelText('Location') as HTMLInputElement
    const description = screen.getByLabelText('Description') as HTMLInputElement

    expect(name.value).toBe(modalProps.user.name)
    expect(address.value).toBe(modalProps.user.address)
    expect(description.value).toBe(modalProps.user.description)
})

test('When user click on close modal should call onClose', () => {
    const { modalProps, onCloseSpy } = setup()

    render(
        <MockedProvider>
            <EditModal {...modalProps} />
        </MockedProvider>
    )

    const cancelButton = screen.getByRole('button', {
        name: 'Cancel',
    })
    fireEvent.click(cancelButton)

    expect(onCloseSpy).toBeCalledTimes(1)
})

test('When user save the edited user should call onSave', async () => {
    const { modalProps, onSaveSpy } = setup()
    const { updateUserMock } = getUpdateMutationMock()

    render(
        <MockedProvider mocks={[updateUserMock]}>
            <EditModal {...modalProps} />
        </MockedProvider>
    )

    const submitButton = screen.getByRole('button', {
        name: 'Save',
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
        expect(onSaveSpy).toBeCalledTimes(1)
    })
})

test('When user change input should show the change', () => {
    const { modalProps } = setup()

    render(
        <MockedProvider>
            <EditModal {...modalProps} />
        </MockedProvider>
    )

    const name = screen.getByLabelText('Name') as HTMLInputElement
    const address = screen.getByLabelText('Location') as HTMLInputElement
    const description = screen.getByLabelText('Description') as HTMLInputElement

    fireEvent.change(name, { target: { value: 'name2' } })
    fireEvent.change(address, { target: { value: 'address2' } })
    fireEvent.change(description, { target: { value: 'description2' } })

    expect(name.value).toBe('name2')
    expect(address.value).toBe('address2')
    expect(description.value).toBe('description2')
})

test('When user modal renders and location could not found should show a helper text', async () => {
    const { modalProps } = setup()
    const { getLocalizationMock } = getGetLocationQueryMock()

    render(
        <MockedProvider mocks={[getLocalizationMock]}>
            <EditModal {...modalProps} />
        </MockedProvider>
    )

    await waitFor(() => {
        expect(screen.getByText('We do not find your address :(')).toBeInTheDocument()
    })
})

test('When user modal renders and is finding location should show loader', async () => {
    const { modalProps } = setup()

    render(
        <MockedProvider>
            <EditModal {...modalProps} />
        </MockedProvider>
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()
})
