import getCategories from 'api/get/getCategories'
import fetchTags from 'api/get/getTags'
import postCollection from 'api/post/postCollection'
import postTag from 'api/post/postTag'
import CustomFields from 'components/form/CustomFields'
import { pathProfile } from 'paths'
import { useEffect, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function NewCollection() {
    const [items, setItems] = useState(new Map())
    const [categories, setCategories] = useState([])
    const [fetchedTags, setFetchedTags] = useState([])
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const { t } = useTranslation()
    const handleChange = event => {
        setTags(event)
    }
    useEffect(() => {
        getCategories().then(result => setCategories(result))
        fetchTags().then(result => setFetchedTags(result))
    }, [])
    const handleSubmit = async event => {
        event.preventDefault()
        const { title, category, description } = event.target.elements
        for (let i = 0; i < tags.length; i++) {
            if (tags[i]?.customOption) {
                postTag(tags[i].label)
                tags[i] = tags[i].label
            }
        }
        let itemList = []
        let files = []
        items.forEach((properties, id) => {
            let list = []
            properties.forEach((type, title) => {
                let value
                if (type === 'boolean') {
                    value = event.target.elements[title + id].checked.toString()
                } else if (type === 'image') {
                    files.push({ title: title, file: event.target.elements[title + id].files[0] })
                } else {
                    value = event.target.elements[title + id].value
                }
                list.push({
                    title: title,
                    type: type,
                    value: value
                })
            })
            itemList.push({
                title: event.target.elements['title' + id].value,
                properties: list
            })
        })
        await postCollection(title.value, category.value, tags, description.value, itemList, files)
        navigate(pathProfile)
    }
    return (
        <Container fluid>
            <Helmet>
                <title>{t('pageNewCollection')}</title>
            </Helmet>
            <Form onSubmit={handleSubmit} className='new-collection-form me-auto ms-auto' id='newcollectionform'>
                <Form.Group className='mb-3'>
                    <Form.Control required type='text' name='title' placeholder={t('uiTitle')} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Select name='category'>
                        {
                            categories.map(category => { return <option key={category} value={category}>{t(category)}</option> })
                        }
                    </Form.Select>
                </Form.Group>
                <Typeahead
                    allowNew
                    id='tags'
                    multiple
                    newSelectionPrefix={t('uiNewSelectionPrefix')}
                    options={fetchedTags}
                    placeholder={t('uiTags')}
                    minLength={3}
                    onChange={handleChange}
                />
                <Form.Group className='my-3'>
                    <Form.Control required as='textarea' rows={3} name='description' placeholder={t('uiDescription')} />
                </Form.Group>
                <CustomFields items={items} />
                <Button variant='primary me-2' type='submit'>
                    {t('uiCreate')}
                </Button>
            </Form>
        </Container>
    )
}
