import firebase from 'utils/firebase'

export default async function deleteCollection(collectionId) {
    await fetch('/api/delete-collection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': await firebase.auth().currentUser.getIdToken()
        },
        body: JSON.stringify({ id: collectionId })
    })
        .catch(error => console.log(error))
}