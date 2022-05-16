import firebase from 'utils/firebase'

export default async function signOut() {
    await firebase.auth().signOut()
}
