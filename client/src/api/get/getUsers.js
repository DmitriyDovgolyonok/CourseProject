import firebase from 'utils/firebase'

export default async function getUsers() {
    const users = await fetch('/api/get-users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': await firebase.auth().currentUser.getIdToken()
        }
    })
        .catch(error => console.log(error))
    return await users.json()
}
