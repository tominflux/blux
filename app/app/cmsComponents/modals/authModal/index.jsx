import React from 'react'
import Modal from '../../abstract/modal'
import Textbox from '../../abstract/textbox'
import Button from '../../abstract/button'

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
            <p>
                {props.children}
            </p>
            <Textbox
                onChange={(e) => onUserChange(e)}
            >
                Username
            </Textbox>
            <Textbox
                onChange={(e) => onPassChange(e)}
            >
                Password / Personal Access Token*
            </Textbox>
            <p>
                <i>
                    *Personal Access Token advised for enhanced security.
                </i>
            </p>
            <Button
                onClick={() => onSubmit()}
            >
                Submit
            </Button>
        </Modal>
    )
}