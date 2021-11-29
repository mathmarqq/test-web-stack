import React from 'react'
import { render, screen } from '../../testUtils/testUtils'
import TextField from './TextField'

test('When TextField renders should show the label', () => {
    render(<TextField label="Label" inputId="inputId" />)

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
})
