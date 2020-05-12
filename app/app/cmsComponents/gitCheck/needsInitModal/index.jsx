import React from 'react'
import Modal from '../../abstract/modal'
import Textbox from '../../abstract/textbox'
import Button from '../../abstract/button'
import AuthModal from '../../modals/authModal'

export default function NeedsInitModal(props) {
    return (
        <AuthModal
            onClickAway={null}
            show={props.show}
            heading={"Importing Static Content"}
            onSubmit={props.onSubmit}
        >
            <p>
                Authentication required to clone static content 
                repository.
            </p>
        </AuthModal>
    )
}