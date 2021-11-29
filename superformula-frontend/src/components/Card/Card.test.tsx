import React from 'react'
import { render, screen } from '../../testUtils/testUtils'
import Card from './Card'

test('When Card renders should show his children', () => {
    render(<Card>Teste</Card>)

    expect(screen.getByText('Teste')).toBeInTheDocument()
})
