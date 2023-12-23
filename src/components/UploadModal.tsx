"use client"
import React from 'react'
import Modal from './Modal'
import useUploadModal from '../../hooks/useUpload'

const UploadModal = () => {
    const {isOpen,onClose,onOpen} = useUploadModal()
    const onChange = (open:boolean) => {
        if(!open){
            onClose()
        }
    }
    return (
        <Modal title='Upload modal title ' description='Upload modal description ' isOpen={isOpen} onChange={onChange}>
            sss
        </Modal>
    )
}

export default UploadModal