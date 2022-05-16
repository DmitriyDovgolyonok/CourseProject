import firebase from 'utils/firebase'

export default async function postTag(tag) {
    fetch('/api/post-tag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': await firebase.auth().currentUser.getIdToken()
        },
        body: JSON.stringify({ tag: tag }),
    })
        .catch(error => console.log(error))
}