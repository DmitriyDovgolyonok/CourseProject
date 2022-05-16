import search from 'api/get/search'
import CollectionList from 'components/view/CollectionList'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export default function Search() {
    const [collections, setCollections] = useState([])
    const { state } = useLocation()
    const { t } = useTranslation()
    useEffect(() => {
        search(state).then(result => setCollections(result))
    }, [state])
    return (
        <Container fluid>
            <Helmet>
                <title>{t('pageSearch', { query: state })}</title>
            </Helmet>
            <CollectionList collections={collections} />
        </Container>
    )
}
