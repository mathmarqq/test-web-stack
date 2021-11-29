import React from 'react'
import { render, screen } from '../../testUtils/testUtils'
import Button from './Button'

test('When button renders should show his children', () => {
    render(<Button variant="primary">Teste</Button>)

    expect(screen.getByText('Teste')).toBeInTheDocument()
})
