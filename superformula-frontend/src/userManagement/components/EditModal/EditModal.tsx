import React, { ReactElement } from 'react'
import { EditModalProps } from './EditModal.types'
import Modal from '../../../components/Modal/Modal'
import TextField from '../../../components/TextField/TextField'
import Button from '../../../components/Button/Button'
import styles from './EditModal.module.scss'

function EditModal(props: EditModalProps): ReactElement {
    return (
        <Modal isShowing className={styles.modal}>
            <h3 className={styles.title}>Edit user</h3>
            <div className={styles.form}>
                <img
                    src="http://recipes-food.club/wp-content/uploads/2019/01/capture.png"
                    alt="map"
                />
                <div className={styles.inputs}>
                    <TextField label="Name" inputId="nameInput" />
                    <TextField label="Location" inputId="locationInput" />
                    <TextField label="Description" inputId="descriptionInput" />
                </div>
            </div>
            <div className={styles.actionButtons}>
                <Button variant="primary" type="button">
                    Save
                </Button>
                <Button variant="secondary" type="button">
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default EditModal
