import firebase from 'utils/firebase'

export default async function signIn(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            throw new Error('errWrongLogin')
        } else if (error.code === 'auth/user-not-found') {
            throw new Error('errUserNotFound')
        } else {
            throw error
        }
    }
}
