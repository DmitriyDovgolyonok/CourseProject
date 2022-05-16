import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useTranslation } from 'react-i18next'

export default function PasswordInput({ className }) {
    const [reveal, setReveal] = useState(false)
    const { t } = useTranslation()
    var inputType = reveal ? 'text' : 'password'
    return (
        <InputGroup className={className}>
            <Form.Control type={inputType} name='password' placeholder={t('uiPassword')} />
            <Button onClick={() => setReveal(!reveal)}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
        </InputGroup>
    )
}
