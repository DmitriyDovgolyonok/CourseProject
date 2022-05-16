import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getUsersCollections from 'api/get/getUsersCollections'
import signOut from 'api/post/signOut'
import CollectionList from 'components/view/CollectionList'
import { pathAdmin, pathNewCollection } from 'paths'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Profile() {
    const [collections, setCollections] = useState([])
    const { token, admin } = useContext(AuthenticationContext)
    const { t } = useTranslation()
    useEffect(() => {
        getUsersCollections(token.uid).then(result => setCollections(result))
    }, [token.uid])
    const handleSignOut = event => {
        try {
            signOut()
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <Container fluid>
            <Helmet>
                <title>{t('pageProfile')}</title>
            </Helmet>
            <Row className='mb-3 g-0 align-items-center'>
                <Col className='pe-3' sm='auto'>
                    <h4 className='mt-2 mb-0'>
                        {t('uiUserGreeting', { username: token.displayName })}
                    </h4>
                </Col>
                <Col>
                    <Button className='mt-2 me-2' onClick={handleSignOut}>
                        {t('uiSignOut')}
                    </Button>
                    {
                        admin &&
                        <Button className='mt-2' as={Link} to={pathAdmin}>
                            {t('uiAdmin')}
                        </Button>
                    }
                </Col>
            </Row>
            <Row className='mb-3 g-0 align-items-center'>
                <Col className='pe-1' xs='auto'>
                    <h4 className='mb-0'>
                        {t('uiYourCollections')}
                    </h4>
                </Col>
                <Col>
                    <Button className='bg-transparent border-0' variant='success' as={Link} to={pathNewCollection}>
                        <FontAwesomeIcon icon={faPlus} color='green' />
                    </Button>
                </Col>
            </Row>
            <CollectionList collections={collections} />
        </Container>
    )
}
