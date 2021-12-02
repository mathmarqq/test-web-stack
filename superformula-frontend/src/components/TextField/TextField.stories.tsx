import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../styles/themes.module.scss'
import TextField, { TextFieldProps } from './TextField'

export default {
    title: 'Components/TextField',
    component: TextField,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<TextFieldProps> = (args: TextFieldProps) => <TextField {...args} />

export const Main = Template.bind({})
Main.args = { label: 'Label', inputId: 'inputId', placeholder: 'Placeholder' }
