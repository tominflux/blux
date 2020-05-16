import React from 'react'
import AuthModal from "../../modals/authModal";

export default function LoginModal(props) {
    return (
        <AuthModal
            show
            onClickAway={null}
            heading="Log In"
            onSubmit={props.onSubmit}
        >
            Please login with your BluxCMS credentials.
        </AuthModal>
    )
}