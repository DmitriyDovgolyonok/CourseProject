import getAllCollections from 'api/get/getAllCollections'
import getPopularTags from 'api/get/getPopularTags'
import CollectionList from 'components/view/CollectionList'
import { pathByTag } from 'paths'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const [state, setState] = useState({
        tags: [],
        collections: []
    })
    const navigate = useNavigate()
    const { t } = useTranslation()
    const handleFindByTag = async event => {
        navigate(pathByTag, { state: event.target.value })
    }
    useEffect(() => {
        getPopularTags().then(async tags => {
            setState({
                tags: tags,
                collections: await getAllCollections()
            })
        })
    }, [])
    return (
        <Container fluid>
            <Helmet>
                <title>{t('pageHome')}</title>
            </Helmet>
            <Row className='mb-3 gx-0 align-items-center'>
                <Col className='pe-3' sm='auto'>
                    <h4 className='mt-2 mb-0'>
                        {t('uiPopularTags')}
                    </h4>
                </Col>
                <Col>
                    {
                        state.tags.map(tag =>
                            <Button className='me-2 mt-2' key={tag.tag} value={tag.tag} onClick={handleFindByTag}>
                                {tag.tag}
                            </Button>)
                    }
                </Col>
            </Row>
            <CollectionList collections={state.collections} />
        </Container>
    )
}
