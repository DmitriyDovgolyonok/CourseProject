import fetchComments from 'api/get/getComments'
import postComment from 'api/post/postComment'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { SocketContext } from 'providers/SocketProvider'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

export default function Collection() {
    const [comments, setComments] = useState([])
    const { token } = useContext(AuthenticationContext)
    const { socket } = useContext(SocketContext)
    const { collectionId } = useParams()
    const { t } = useTranslation()
    const handlePostComment = event => {
        event.preventDefault()
        event.stopPropagation()
        postComment(token.uid, collectionId, event.target.elements.comment.value)
        event.target.elements.comment.value = ''
    }
    useEffect(() => {
        var mounted = true
        fetchComments(collectionId).then(result => setComments(result))
        socket.on('new comment', comment => {
            fetchComments(collectionId).then(result => mounted && setComments(result))
        })
        return () => { mounted = false }
    }, [collectionId, socket, token])
    return (
        <div className='comment-section me-auto ms-auto'>
            <h5 className='mb-3'>
                {t('uiComments')}
            </h5>
            {
                comments.map((comment, i) =>
                    <Fragment key={'CommentSectionFragment' + i}>
                        <div key='CommentSectionFlex' className='d-flex align-items-center'>
                            <h6 className='mb-0 me-2'>
                                {comment.user.name + ':'}
                            </h6>
                            <div>
                                {comment.comment}
                            </div>
                        </div>
                    </Fragment>
                )
            }
            {
                token &&
                <Form onSubmit={handlePostComment}>
                    <Form.Control required autoComplete='off' className='my-3' name='comment' placeholder={t('uiComment')} />
                    <Button variant='primary' type='submit'>
                        {t('uiSend')}
                    </Button>
                </Form>
            }

        </div>
    )
}
