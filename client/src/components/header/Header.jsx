import { pathHome } from 'paths'
import { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageDropdown from './LanguageDropdown'
import ProfileButton from './ProfileButton'
import SearchBar from './SearchBar'

export default function Header() {
    const { t } = useTranslation()
    return (
        <Navbar className='p-2 mb-3' collapseOnSelect expand='md' >
            <Navbar.Brand as={Link} to={pathHome}>{t('siteTitle')}</Navbar.Brand>
            <SearchBar />
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className='ms-auto'>
                    <div className='d-flex justify-content-end ms-auto'>
                        <LanguageDropdown />
                        <ProfileButton />
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}