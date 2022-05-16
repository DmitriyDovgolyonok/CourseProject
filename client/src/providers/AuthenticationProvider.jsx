import getAdminStatus from 'api/get/getAdminStatus'
import { createContext, useEffect, useState } from 'react'
import firebase from 'utils/firebase'

export const AuthenticationContext = createContext()

export function AuthenticationProvider({ children }) {
    const [authentication, setAuthentication] = useState({
        token: null,
        admin: false,
        loading: true
    })
    useEffect(() => {
        firebase.auth().onIdTokenChanged(async newToken => {
            setAuthentication({
                token: newToken,
                admin: await getAdminStatus(newToken?.uid),
                loading: false
            })
        })
    }, [])
    return (
        <AuthenticationContext.Provider value={authentication}>
            {children}
        </AuthenticationContext.Provider>
    )
}
