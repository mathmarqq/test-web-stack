import { ButtonHTMLAttributes } from 'react'
import { themeVariant } from '../../styles'

type ButtonProps = {
    variant: themeVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

export type { ButtonProps }
