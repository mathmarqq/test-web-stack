import React from 'react'
import { fireEvent, render, screen } from 'testUtils/testUtils'
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

    return { modalProps, onCloseSpy }
}

test('When user modal renders should show user data', () => {
    const { modalProps } = setup()

    render(<EditModal {...modalProps} />)

    const name = screen.getByLabelText('Name') as HTMLInputElement
    const address = screen.getByLabelText('Location') as HTMLInputElement
    const description = screen.getByLabelText('Description') as HTMLInputElement

    expect(name.value).toBe(modalProps.user.name)
    expect(address.value).toBe(modalProps.user.address)
    expect(description.value).toBe(modalProps.user.description)
})

test('When user click on close modal should call onClose', () => {
    const { modalProps, onCloseSpy } = setup()

    render(<EditModal {...modalProps} />)

    const cancelButton = screen.getByRole('button', {
        name: 'Cancel',
    })
    fireEvent.click(cancelButton)

    expect(onCloseSpy).toBeCalledTimes(1)
})

test('When user change input should show the change', () => {
    const { modalProps } = setup()

    render(<EditModal {...modalProps} />)

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
