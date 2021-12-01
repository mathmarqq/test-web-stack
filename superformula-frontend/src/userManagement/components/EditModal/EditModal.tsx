import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EditModalProps } from './EditModal.types'
import Modal from '../../../components/Modal/Modal'
import TextField from '../../../components/TextField/TextField'
import Button from '../../../components/Button/Button'
import styles from './EditModal.module.scss'
import { updateUser as updateUserMutation } from '../../../infra/graphql/mutations'

type FormData = {
    name: string
    address: string
    description: string
}

function EditModal({ user, isShowing, onSave, onClose }: EditModalProps): ReactElement {
    const [formData, setFormData] = useState<FormData>({
        name: user.name,
        address: user.address,
        description: user.description,
    })

    const [updateUserAsync, { data }] = useMutation(updateUserMutation)

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

    return (
        <Modal
            isShowing={isShowing}
            className={styles.modal}
            backgroundClassName={styles.background}
        >
            <h3 className={styles.title}>Edit user</h3>
            <div className={styles.form}>
                <img
                    src="http://recipes-food.club/wp-content/uploads/2019/01/capture.png"
                    alt="map"
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
                        onChange={(event) => changeInput('address', event)}
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
