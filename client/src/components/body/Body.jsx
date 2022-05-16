import { useContext } from 'react'

export default function Body({ children }) {
    //const { theme } = useContext(ThemeContext)
    return (
        <div className='min-vh-100 '>
            {children}
        </div>
    )
}