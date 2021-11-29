import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../styles/themes.module.scss'
import Card from './Card'
import { CardProps } from './Card.types'

export default {
    title: 'Components/Card',
    component: Card,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<CardProps> = (args: CardProps) => <Card {...args} />

export const Main = Template.bind({})
Main.args = { children: 'Card' }
