import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Modal from 'components/Modal/Modal'
import TextField from 'components/TextField/TextField'
import Button from 'components/Button/Button'
import { updateUser as updateUserMutation } from 'infra/graphql/mutations'
import { getLocation, GetLocationResponse, GetLocationQueryVariables } from 'infra/graphql/queries'
import { _debounce } from 'utils/utils'
import { User } from 'domains/users/models/User'
import ModalMap from 'domains/users/components/ModalMap/ModalMap'
import styles from './EditModal.module.scss'

type FormData = {
    name: string
    address: string
    description: string
}

type EditModalProps = {
    user: User
    onSave: () => void
    onClose: () => void
}

function EditModal({ user, onSave, onClose }: EditModalProps): ReactElement {
    const [formData, setFormData] = useState<FormData>({
        name: user.name,
        address: user.address,
        description: user.description,
    })

    const [updateUserAsync, { data }] = useMutation(updateUserMutation)

    const {
        data: locationData,
        loading,
        refetch,
    } = useQuery<GetLocationResponse, GetLocationQueryVariables>(getLocation, {
        variables: {
            address: user.address,
        },
    })

    const debouncedRefetch = useMemo(() => _debounce(refetch, 1000), [refetch])

    useEffect(() => {
        if (data) {
            onSave()
        }
    }, [data, onSave])

    function updateUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        updateUserAsync({
            variables: { input: { id: user.id, ...formData } },
        })
    }

    function changeInput(key: string, e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [key]: e.target.value,
        })
    }

    function changeAdress(event: ChangeEvent<HTMLInputElement>) {
        changeInput('address', event)

        debouncedRefetch({
            address: event.target.value,
        })
    }

    return (
        <Modal className={styles.modal} backgroundClassName={styles.background} onClose={onClose}>
            <h3 className={styles.title}>Edit user</h3>
            <div className={styles.form}>
                <ModalMap
                    loading={loading}
                    center={{
                        latitude: locationData?.getLocation.latitude || 0,
                        longitude: locationData?.getLocation.longitude || 0,
                    }}
                />
                <form id="edit-user-form" className={styles.inputs} onSubmit={updateUser}>
                    <TextField
                        label="Name"
                        inputId="nameInput"
                        value={formData.name}
                        onChange={(event) => changeInput('name', event)}
                    />
                    <TextField
                        label="Location"
                        inputId="locationInput"
                        value={formData.address}
                        onChange={(event) => changeAdress(event)}
                    />
                    <TextField
                        label="Description"
                        inputId="descriptionInput"
                        value={formData.description}
                        onChange={(event) => changeInput('description', event)}
                    />
                </form>
            </div>
            <div className={styles.actionButtons}>
                <Button variant="primary" type="submit" form="edit-user-form">
                    Save
                </Button>
                <Button variant="secondary" type="button" onClick={() => onClose()}>
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default EditModal
export type { EditModalProps }
