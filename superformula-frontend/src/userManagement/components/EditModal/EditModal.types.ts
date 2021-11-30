import { User } from '../../models/User'

type EditModalProps = {
    user: User
    isShowing: boolean
    onSave: () => void
}

export type { EditModalProps }
