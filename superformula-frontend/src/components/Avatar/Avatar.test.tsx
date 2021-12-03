import React from 'react'
import { render, screen } from '../../utils/testUtils'
import Avatar from './Avatar'

test('When avatar renders should be have a alt atribute and src url', () => {
    render(<Avatar imgUrl="fake_url" imgAlt="Fake Name" />)

    const image = screen.getByAltText('Fake Name')

    expect(image).toHaveAttribute('src', 'fake_url')
})
