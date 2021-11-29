import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../../styles/themes.module.scss'
import { UserCardProps } from './UserCard.types'
import UserCard from './UserCard'

export default {
    title: 'Components/UserManagement/Card',
    component: UserCard,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<UserCardProps> = (args: UserCardProps) => <UserCard {...args} />

export const Main = Template.bind({})
Main.args = {
    name: 'Rex The Dog',
    description: 'description',
    imgUrl: 'https://media.istockphoto.com/photos/funny-west-highland-white-terrier-dog-decorated-with-photo-props-sits-picture-id1292884801',
    creationDate: new Date(),
}
