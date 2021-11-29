import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../styles/themes.module.scss'
import { InputProps } from './Input.types'
import Input from './Input'

export default {
    title: 'Components/Input',
    component: Input,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<InputProps> = (args: InputProps) => <Input {...args} />

export const Main = Template.bind({})
