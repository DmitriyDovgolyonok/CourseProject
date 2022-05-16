import Form from 'react-bootstrap/Form'
import { useTranslation } from 'react-i18next'

export default function LanguageDropdown() {
    const { i18n } = useTranslation()
    const handleChange = event => i18n.changeLanguage(event.target.value)
    return (
        <Form.Select className='me-2' value={i18n.language} onChange={handleChange}>
            <option value='en'>English</option>
            <option value='ru'>Русский</option>
        </Form.Select>
    )
}