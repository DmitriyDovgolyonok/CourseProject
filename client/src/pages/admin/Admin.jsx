import getUsers from 'api/get/getUsers'
import blockUser from 'api/post/blockUser'
import unblockUser from 'api/post/unblockUser'
import { pathProfile } from 'paths'
import { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Admin() {
    const [users, setUsers] = useState(new Map())
    const [hack, setHack] = useState(false)
    const { t } = useTranslation()
    useEffect(() => {
        getUsers().then(result => {
            const kv = result.map(user => [user._id, {
                name: user.name,
                admin: user.admin,
                blocked: user.blocked
            }])
            setUsers(new Map(kv))
        })
    }, [])
    const handleToggleBlock = event => {
        var user = users.get(event.target.value)
        user.blocked ? unblockUser(event.target.value) : blockUser(event.target.value)
        user.blocked = !user.blocked
        setHack(!hack)
    }
    return (
        <Container>
            <Helmet>
                <title>{t('pageAdmin')}</title>
            </Helmet>
            <Accordion>
                {
                    Array.from(users, ([id, properties], i) =>
                        <Accordion.Item key={'AdminAccordionItem' + i} eventKey={i}>
                            <Accordion.Header key={'AdminAccordionHeader' + i}>
                                <div key={'AdminDivItem' + i}>
                                    <h4 key={'AdminH4' + i}>
                                        {properties.name}
                                    </h4>
                                    <div key={'AdminDivInfo' + i} className='text-muted'>
                                        {
                                            id + (properties.admin ? `, ${t('uiAdmin')} ` : '') + (properties.blocked ? `, ${t('uiBlocked')}` : '')
                                        }
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body key={'AdminAccordionBody' + i}>
                                <Button
                                    key={'AdminButtonProfile' + i}
                                    as={Link}
                                    to={pathProfile + '/' + id}
                                >
                                    {t('uiProfile')}
                                </Button>
                                <div key={'AdminDivButtons' + i} className='float-end'>
                                    <Button
                                        key={'AdminButtonBlock' + i}
                                        className='me-2'
                                        variant={properties.blocked ? 'success' : 'danger'}
                                        value={id}
                                        onClick={handleToggleBlock}
                                    >
                                        {properties.blocked ? t('uiUnblock') : t('uiBlock')}
                                    </Button>
                                    <Button
                                        key={'AdminButtonAdmin' + i}
                                        variant={properties.admin ? 'danger' : 'success'}
                                        value={id}
                                    >
                                        {properties.admin ? t('uiRevokeAdmin') : t('uiMakeAdmin')}
                                    </Button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                }
            </Accordion>
        </Container>
    )
}
