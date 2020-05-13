import React from 'react'
import Modal from '../../abstract/modal'
import Textbox from '../../abstract/textbox'
import Password from '../../abstract/password'
import Button from '../../abstract/button'
import './styles.css'

export default function AuthModal(props) {
    //State
    const [user, setUser] = React.useState(null)
    const [pass, setPass] = React.useState(null)
    //Events
    const onUserChange = (e) => {
        const userText = e.target.value
        setUser(userText)
    }
    const onPassChange = (e) => {
        const passText = e.target.value
        setPass(passText)
    }
    const onSubmit = () => {
        props.onSubmit(user, pass)
    }
    //Functions
    const getHeading = () => (
        "Authentication Required" + (
            props.heading ? 
                ` | ${props.heading}` : ""
        )
    )
    //
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={getHeading()}
        >
            <p className="blux-auth-modal__info">
                {props.children}
            </p>
            <Textbox
                className="blux-auth-modal__user"
                onChange={(e) => onUserChange(e)}
            >
                Username
            </Textbox>
            <Password
                className="blux-auth-modal__pass"
                onChange={(e) => onPassChange(e)}
            >
                Password / Personal Access Token*
            </Password>
            <p className="blux-auth-modal__pat-recommendation">
                *Personal Access Token advised for enhanced security.
            </p>
            <Button
                onClick={() => onSubmit()}
            >
                Submit
            </Button>
        </Modal>
    )
}