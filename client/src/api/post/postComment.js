import firebase from 'utils/firebase'

export default async function postComment(uid, id, text) {
    fetch('/api/post-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': await firebase.auth().currentUser.getIdToken()
        },
        body: JSON.stringify({ uid: uid, id: id, text: text })
    })
        .catch(error => console.log(error))
}