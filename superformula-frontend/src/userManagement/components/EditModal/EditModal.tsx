import React, { ReactElement, useState } from 'react'
import { EditModalProps } from './EditModal.types'
import Modal from '../../../components/Modal/Modal'
import TextField from '../../../components/TextField/TextField'
import Button from '../../../components/Button/Button'
import styles from './EditModal.module.scss'

function EditModal({ user, isShowing, onSave }: EditModalProps): ReactElement {
    const [name, setName] = useState(user.name)
    const [adress, setAdress] = useState(user.address)
    const [description, setDescription] = useState(user.description)

    function handleUpdateuser() {
        onSave()
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
                <div className={styles.inputs}>
                    <TextField
                        label="Name"
                        inputId="nameInput"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        label="Location"
                        inputId="locationInput"
                        value={adress}
                        onChange={(event) => setAdress(event.target.value)}
                    />
                    <TextField
                        label="Description"
                        inputId="descriptionInput"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
            </div>
            <div className={styles.actionButtons}>
                <Button variant="primary" type="button" onClick={() => handleUpdateuser()}>
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
