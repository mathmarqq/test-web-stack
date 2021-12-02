import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../styles/themes.module.scss'
import Loader, { LoaderProps } from './Loader'

export default {
    title: 'Components/Loader',
    component: Loader,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<LoaderProps> = (args: LoaderProps) => <Loader {...args} />

export const Main = Template.bind({})
