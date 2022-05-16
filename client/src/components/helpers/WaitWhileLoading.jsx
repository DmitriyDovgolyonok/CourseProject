import { AuthenticationContext } from 'providers/AuthenticationProvider'
import { useContext } from 'react'

export default function WaitWhileLoading({ children }) {
    const { loading } = useContext(AuthenticationContext)
    return loading ? <></> : children
}
