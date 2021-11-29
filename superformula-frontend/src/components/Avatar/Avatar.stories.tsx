import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../styles/themes.module.scss'
import Avatar from './Avatar'
import { AvatarProps } from './Avatar.types'

export default {
    title: 'Components/Avatar',
    component: Avatar,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<AvatarProps> = (args: AvatarProps) => <Avatar {...args} />

export const Main = Template.bind({})
Main.args = {
    imgUrl: 'https://media.istockphoto.com/photos/funny-west-highland-white-terrier-dog-decorated-with-photo-props-sits-picture-id1292884801',
    imgAlt: 'Cute Dog',
}
