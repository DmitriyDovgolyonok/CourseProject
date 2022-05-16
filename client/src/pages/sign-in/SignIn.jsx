import signIn from 'api/post/signIn'
import PasswordInput from 'components/form/PasswordInput'
import { pathSignUp } from 'paths'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function SignIn() {
    const { t } = useTranslation()
    const handleSignIn = async event => {
        event.preventDefault()
        event.stopPropagation()
        const { email, password } = event.target.elements
        try {
            await signIn(email.value, password.value)
        } catch (error) {
            alert(t(error.message))
        }
    }
    return (
        <Container fluid>
            <Helmet>
                <title>{t('pageSignIn')}</title>
            </Helmet>
            <Form className='user-form ms-auto me-auto' onSubmit={handleSignIn}>
                <Form.Control className='mb-3' type='email' name='email' placeholder={t('uiEmail')} />
                <PasswordInput className='mb-3' />
                <Nav.Link className='mb-3 p-0' as={Link} to={pathSignUp}>
                    {t('uiSignUpPrompt')}
                </Nav.Link>
                <Button variant='primary' type='submit'>
                    {t('uiSignIn')}
                </Button>
            </Form>
        </Container>
    )
}
