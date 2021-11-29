import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../../styles/themes.module.scss'
import EditModal from './EditModal'
import { EditModalProps } from './EditModal.types'

export default {
    title: 'Components/UserManagement/EditModal',
    component: EditModal,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<EditModalProps> = (args: EditModalProps) => <EditModal {...args} />

export const Main = Template.bind({})
