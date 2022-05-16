import fetchCollection from 'api/get/getCollection'
import deleteCollection from 'api/post/deleteCollection'
import deleteItem from 'api/post/deleteItem'
import CommentSection from 'components/view/CommentSection'
import Likes from 'components/view/Likes'
import { pathByTag } from 'paths'
import { SocketContext } from 'providers/SocketProvider'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { Helmet } from 'react-helmet-async'

export default function Collection() {
    const [state, setState] = useState({
        loading: true,
        collection: null
    })
    const { token, admin } = useContext(AuthenticationContext)
    const { socket } = useContext(SocketContext)
    const { collectionId } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const handleTagClick = event => {
        navigate(pathByTag, { state: event.target.value })
    }
    const handleDeleteCollection = async event => {
        await deleteCollection(collectionId)
        navigate(-1)
    }
    const handleDeleteItem = async id => {
        await deleteItem(id)
        fetchCollection(collectionId).then(result => setState({
            loading: false,
            collection: result
        }))
    }
    useEffect(() => {
        fetchCollection(collectionId).then(result => setState({
            loading: false,
            collection: result
        }))
        socket.emit('collection', collectionId)
        return () => {
            socket.emit('left collection', collectionId)
        }
    }, [collectionId, socket])
    if (state.loading) {
        return <></>
    } else {
        return (
            <Container fluid>
                <Helmet>
                    <title>{t('pageCollection')}</title>
                </Helmet>
                <div className='d-flex align-items-center mb-3'>
                    <h1 className='mb-0 me-3'>
                        {state.collection.title}
                    </h1>
                    {
                        (token && (state.collection.user === token.uid || admin)) &&
                        <Button onClick={handleDeleteCollection} className='bg-transparent border-0'>
                            <FontAwesomeIcon icon={faTrash} color='red' />
                        </Button>
                    }
                </div>
                <h3 className='pb-0'>
                    {t('uiDescription')}
                </h3>
                <div className='border rounded p-3 mb-3'>
                    <ReactMarkdown components={{ p: 'div' }} children={state.collection.description} remarkPlugins={[remarkGfm]} />
                </div>
                <div className='h3'>{t('uiTags')}</div>
                <div className='border rounded p-3 mb-3'>
                    {
                        state.collection.tags.map(tag =>
                            <Button key={tag} value={tag} onClick={handleTagClick} className='me-2'>
                                {tag}
                            </Button>)
                    }
                </div>
                {
                    state.collection.items.map((item, i) =>
                        <Fragment key={'CollectionFragment' + i}>
                            <div className='d-flex align-items-center mt-4'>
                                <h5 key={'CollectionItemTitle' + i} className='mb-0 me-3'>
                                    {item.title}
                                </h5>
                                {
                                    (token && (state.collection.user === token.uid || admin)) &&
                                    <Button onClick={event => handleDeleteItem(item._id)} className='bg-transparent border-0' value={item._id}>
                                        <FontAwesomeIcon icon={faTrash} color='red' />
                                    </Button>
                                }
                            </div>
                            <ListGroup>
                                {
                                    item.properties.map((property, j) => {
                                        var element
                                        if (property.type === 'image') {
                                            element = <Image key={property.name + i + j} className='item-image' src={property.value} />
                                        } else if (property.type === 'color') {
                                            element = <Form.Control key={property.name + i + j} type='color' disabled={true} defaultValue={property.value} />
                                        }
                                        else {
                                            element = <div key={property.name + i + j}>{property.value}</div>
                                        }
                                        return (
                                            <ListGroup.Item key={'CollectionItem' + i + j}>
                                                <div key={'CollectionFlex' + i + j} className='d-flex align-items-center'>
                                                    <h6 key={'CollectionItemTitle' + i + j} className='mb-0 me-5'>
                                                        {property.title}
                                                    </h6>
                                                    {element}
                                                </div>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Fragment>
                    )
                }
                <Likes collectionId={collectionId} />
                <CommentSection collectionId={collectionId} />
            </Container >
        )
    }
}
