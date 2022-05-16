import { pathProfile } from 'paths'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function UnauthenticatedOnly({ children }) {
    const { token } = useContext(AuthenticationContext)
    return token ? <Navigate to={pathProfile} replace={true} /> : children
}