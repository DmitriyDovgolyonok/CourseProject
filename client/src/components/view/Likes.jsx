import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getLikes from 'api/get/getLikes'
import getLikeStatus from 'api/get/getLikeStatus'
import toggleLike from 'api/post/toggleLike'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { SocketContext } from 'providers/SocketProvider'
import { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'

export default function Likes({ collectionId }) {
    const [state, setState] = useState({
        likes: 0,
        liked: false
    })
    const { token } = useContext(AuthenticationContext)
    const { socket } = useContext(SocketContext)
    const { t } = useTranslation()
    const handleToggleLike = event => {
        event.preventDefault()
        event.stopPropagation()
        toggleLike(collectionId)
    }
    useEffect(() => {
        var mounted = true
        getLikes(collectionId).then(async result => {
            setState({
                likes: result.value,
                liked: token ? await getLikeStatus(token.uid, collectionId) : false
            })
        })
        socket.on('toggle like', () => {
            getLikes(collectionId).then(async result => {
                var liked = token ? await getLikeStatus(token.uid, collectionId) : false
                if (mounted) {
                    setState({
                        likes: result.value,
                        liked: liked
                    })
                }
            })
        })
        return () => { mounted = false }
    }, [collectionId, token, socket])
    return (
        <div className='d-flex align-items-center mb-3'>
            {
                token &&
                <Button className='bg-transparent border-0 me-1' variant={state.liked ? 'danger' : 'secondary'} onClick={handleToggleLike}>
                    <FontAwesomeIcon icon={faHeart} color={state.liked ? 'red' : 'gray'} />
                </Button>
            }
            <div>
                {state.likes + t('uiLikes', { count: state.likes })}
            </div>
        </div>
    )
}