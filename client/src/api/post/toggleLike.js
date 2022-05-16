import firebase from 'utils/firebase'

export default async function toggleLike(collectionId) {
    fetch('/api/toggle-like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': await firebase.auth().currentUser.getIdToken()
        },
        body: JSON.stringify({ id: collectionId })
    })
        .catch(error => console.log(error))
}