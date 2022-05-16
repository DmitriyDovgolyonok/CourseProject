import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pathSearch } from 'paths'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const handleSearch = async event => {
        event.preventDefault()
        navigate(pathSearch, { state: event.target.elements.search.value })
        event.target.elements.search.value = ''
    }
    return (
        <Form className='d-flex me-auto' onSubmit={handleSearch}>
            <FormControl className='me-2' type='search' name='search' placeholder={t('uiSearch')} />
            <Button type='submit'>
                <FontAwesomeIcon icon={faSearch} />
            </Button>
        </Form>
    )
}
