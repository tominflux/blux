import React from 'react'
import Modal from '../../abstract/modal'
import Textbox from '../../abstract/textbox'
import Password from '../../abstract/password'
import Button from '../../abstract/button'
import './styles.css'
import { cmsify } from '../../cmsify'

function AuthModal(props) {
    //State
    const [user, setUser] = React.useState(null)
    const [pass, setPass] = React.useState(null)
    //Events
    const onUserChange = (value) => {
        const userText = value
        setUser(userText)
    }
    const onPassChange = (value) => {
        const passText = value
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
            <div>
                <Textbox
                    className="blux-auth-modal__user"
                    onChange={(e) => onUserChange(e.target.value)}
                    placeholder={props.userPrompt || "Username"}
                />
            </div>
            <div>
                <Password
                    className="blux-auth-modal__pass"
                    onChange={(value) => onPassChange(value)}
                    placeholder={props.passPrompt || "Password"}
                />   
            </div>
            {
                props.note ? 
                    <p className="blux-auth-modal__note">
                        { props.note }
                    </p> : null
            }
            <div>
                <Button
                    className="blux-auth-modal__submit"
                    onClick={() => onSubmit()}
                >
                    Submit
                </Button>
            </div>
        </Modal>
    )
}

export default cmsify(AuthModal)