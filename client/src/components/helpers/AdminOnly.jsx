import { pathProfile } from 'paths'
import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminOnly({ children }) {
    const { admin } = useContext(AuthenticationContext)
    return admin ? children : <Navigate to={pathProfile} replace={true} />
}