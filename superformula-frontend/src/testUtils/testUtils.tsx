import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

const AllTheProviders: FC = ({ children }) => {
    return <MockedProvider>{children}</MockedProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
