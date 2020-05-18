import React from 'react'
import AuthModal from '../../modals/authModal'

export default function NeedsInitModal(props) {
    return (
        <AuthModal
            onClickAway={null}
            show={props.show}
            heading="Importing Static Content"
            passPrompt="Password / Personal Access Token*"
            note="*Personal Access Token advised for enhanced security."
            onSubmit={props.onSubmit}
        >
            Git credentials required to import static content 
            repository.
        </AuthModal>
    )
}