import React from 'react'
import { render, screen, waitFor } from 'utils/testUtils'
import ModalMap from './ModalMap'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
}))

test('When modal map renders and location could not found should show a helper text', async () => {
    render(<ModalMap loading={false} center={{ latitude: 0, longitude: 0 }} />)

    await waitFor(() => {
        expect(screen.getByText('We cannot find your address :(')).toBeInTheDocument()
    })
})

test('When modal map renders and is finding location should show loader', async () => {
    render(<ModalMap loading center={{ latitude: 0, longitude: 0 }} />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
})
