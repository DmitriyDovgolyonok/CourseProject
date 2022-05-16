import getUser from 'api/get/getUser'
import fetchUsersCollections from 'api/get/getUsersCollections'
import CollectionList from 'components/view/CollectionList'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

export default function OtherUsersProfile() {
    const [state, setState] = useState({
        loading: true,
        user: null,
        collections: []
    })
    const { userId } = useParams()
    const { t } = useTranslation()
    useEffect(() => {
        getUser(userId).then(async user => {
            setState({
                loading: false,
                user: user,
                collections: user ? await fetchUsersCollections(userId) : []
            })
        })
    }, [userId])
    if (state.loading) {
        return <></>
    } else if (state.user) {
        return (
            <Container fluid>
                <Helmet>
                    <title>{state.user.name}</title>
                </Helmet>
                <h4 className='mb-3'>
                    {t('uiOtherUsersCollections', { username: state.user.name })}
                </h4>
                <CollectionList collections={state.collections} />
            </Container>
        )
    } else {
        return (
            <Container fluid>
                <Helmet>
                    <title>{t('errUserNotFound')}</title>
                </Helmet>
                <h4 className='mb-3'>
                    {t('errUserNotFound')}
                </h4>
            </Container>
        )
    }
}
