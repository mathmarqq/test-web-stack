import React, { ReactElement } from 'react'
import { AvatarProps } from './Avatar.types'
import styles from './Avatar.module.scss'

function Avatar({ imgUrl, imgAlt }: AvatarProps): ReactElement {
    return <img className={styles.avatar} src={imgUrl} alt={imgAlt} />
}

export default Avatar
