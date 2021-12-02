import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EditModalProps } from './EditModal.types'
import Modal from '../../../components/Modal/Modal'
import TextField from '../../../components/TextField/TextField'
import Button from '../../../components/Button/Button'
import styles from './EditModal.module.scss'
import { updateUser as updateUserMutation } from '../../../infra/graphql/mutations'
import Map from '../../../components/Map/Map'
import {
    getLocation,
    GetLocationResponse,
    GetLocationQueryVariables,
} from '../../../infra/graphql/queries'
import Loader from '../../../components/Loader/Loader'
import { _debounce } from '../../../utils/utils'

type FormData = {
    name: string
    address: string
    description: string
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

    function renderMapContainer() {
        let content

        if (loading) {
            content = (
                <div className={styles.loadWrapper}>
                    <Loader />
                </div>
            )
        } else if (locationData?.getLocation.latitude && locationData?.getLocation.longitude) {
            content = (
                <Map
                    className={styles.map}
                    center={{
                        lat: locationData.getLocation.latitude,
                        lng: locationData.getLocation.longitude,
                    }}
                />
            )
        } else {
            content = (
                <div className={styles.wrongAdressWrapper}>
                    <span>We do not find your address :(</span>
                </div>
            )
        }

        return content
    }

    return (
        <Modal className={styles.modal} backgroundClassName={styles.background}>
            <h3 className={styles.title}>Edit user</h3>
            <div className={styles.form}>
                {renderMapContainer()}
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
