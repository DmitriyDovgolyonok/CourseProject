import { pathSignIn } from 'paths'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthenticatedOnly({ children }) {
    const { token } = useContext(AuthenticationContext)
    return token ? children : <Navigate to={pathSignIn} replace={true} />
}