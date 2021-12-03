import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import { render, screen, waitFor } from 'utils/testUtils'
import ModalMap from './ModalMap'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}))

test('When user modal renders and location could not found should show a helper text', async () => {
    render(<ModalMap loading={false} center={{ latitude: 0, longitude: 0 }} />)

    await waitFor(() => {
        expect(screen.getByText('We do not find your address :(')).toBeInTheDocument()
    })
})

test('When user modal renders and is finding location should show loader', async () => {
    render(<ModalMap loading center={{ latitude: 0, longitude: 0 }} />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
})
