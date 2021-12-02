import { MockedProvider } from '@apollo/client/testing'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'default',
        values: [
            {
                name: 'default',
                value: '#f8f8f8',
            },
        ],
    },
    apolloClient: {
        MockedProvider,
    },
}
