import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import styles from '../../styles/themes.module.scss'
import Map, { MapProps } from './Map'

export default {
    title: 'Components/Map',
    component: Map,
    decorators: [
        (StoryComponent) => (
            <div className={styles.defaultTheme}>
                <StoryComponent />
            </div>
        ),
    ],
} as Meta

const Template: Story<MapProps> = (args: MapProps) => <Map {...args} />

export const Main = Template.bind({})
Main.args = { center: { lat: 28.377034648234925, lng: -81.57069708661061 } }
