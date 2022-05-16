import firebase from 'utils/firebase'

export default async function blockUser(userId) {
    fetch('/api/block-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': await firebase.auth().currentUser.getIdToken()
        },
        body: JSON.stringify({ uid: userId })
    })
        .catch(error => console.log(error))
}