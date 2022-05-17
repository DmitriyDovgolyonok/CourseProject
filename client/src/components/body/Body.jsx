import { useContext } from 'react'

export default function Body({ children }) {
    return (
        <div className='min-vh-100 '>
            {children}
        </div>
    )
}