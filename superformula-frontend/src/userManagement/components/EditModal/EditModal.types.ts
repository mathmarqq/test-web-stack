import { User } from '../../models/User'

type EditModalProps = {
    user: User
    onSave: () => void
    onClose: () => void
}

export type { EditModalProps }
