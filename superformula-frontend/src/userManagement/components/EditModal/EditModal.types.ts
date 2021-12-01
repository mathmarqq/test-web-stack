import { User } from '../../models/User'

type EditModalProps = {
    user: User
    isShowing: boolean
    onSave: () => void
    onClose: () => void
}

export type { EditModalProps }
