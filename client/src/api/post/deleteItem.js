import firebase from 'utils/firebase'

export default async function deleteItem(itemId) {
    await fetch('/api/delete-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': await firebase.auth().currentUser.getIdToken()
        },
        body: JSON.stringify({ id: itemId })
    })
        .catch(error => console.log(error))
}