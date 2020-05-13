import React from 'react'
import AuthModal from '../../modals/authModal'

export default function NeedsInitModal(props) {
    return (
        <AuthModal
            onClickAway={null}
            show={props.show}
            heading={"Importing Static Content"}
            onSubmit={props.onSubmit}
        >
            Git credentials required to import static content 
            repository.
        </AuthModal>
    )
}