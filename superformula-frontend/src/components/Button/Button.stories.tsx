import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from './Button'
import styles from '../../styles/themes.module.scss'

export default {
    title: 'Components/Button',
    component: Button,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = { variant: 'primary', children: 'Primary' }

export const Secondary = Template.bind({})
Secondary.args = { variant: 'secondary', children: 'Secondary' }
