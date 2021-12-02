import React, { ReactElement } from 'react'
import styles from './Avatar.module.scss'

type AvatarProps = {
    imgUrl: string
    imgAlt: string
    className?: string
}
function Avatar({ imgUrl, imgAlt, className = '' }: AvatarProps): ReactElement {
    return <img className={`${styles.avatar} ${className}`} src={imgUrl} alt={imgAlt} />
}

Avatar.defaultProps = {
    className: '',
}

export default Avatar
export type { AvatarProps }
