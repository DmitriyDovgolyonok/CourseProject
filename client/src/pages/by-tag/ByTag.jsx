import getCollectionsByTag from 'api/get/getCollectionsByTag'
import CollectionList from 'components/view/CollectionList'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export default function ByTag() {
    const [collections, setCollections] = useState([])
    const { state } = useLocation()
    const { t } = useTranslation()
    useEffect(() => {
        getCollectionsByTag(state).then(result => setCollections(result))
    }, [state])
    return (
        <Container fluid>
            <Helmet>
                <title>{t('pageByTag', { tag: state })}</title>
            </Helmet>
            <CollectionList collections={collections} />
        </Container>
    )
}
