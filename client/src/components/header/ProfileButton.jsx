import { pathProfile, pathSignIn } from 'paths'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ProfileButton() {
    const { token } = useContext(AuthenticationContext)
    const { t } = useTranslation()
    var to, buttonText
    if (token) {
        to = pathProfile
        buttonText = t('uiProfile')
    } else {
        to = pathSignIn
        buttonText = t('uiSignIn')
    }
    return (
        <Button className='text-nowrap' as={Link} to={to}>
            {buttonText}
        </Button>
    )
}
