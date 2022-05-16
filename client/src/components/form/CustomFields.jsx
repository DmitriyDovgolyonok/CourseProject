import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useTranslation } from 'react-i18next'

export default function CustomFields({ items }) {
    const { t } = useTranslation()
    const [counter, setCounter] = useState(0)
    const addItem = event => {
        items.set(counter, new Map())
        setCounter(counter + 1)
    }
    const removeItem = id => {
        items.delete(id)
        setCounter(counter + 1)
    }
    const addProperty = id => {
        const title = document.getElementById('newFieldTitle' + id).value
        const type = document.getElementById('newFieldType' + id).value
        document.getElementById('newFieldTitle' + id).value = ''
        items.get(id).set(title, type)
        setCounter(counter + 1)
    }
    const deleteProperty = (id, title) => {
        items.get(id).delete(title)
        setCounter(counter + 1)
    }
    var elements = []
    var i = 1
    items.forEach((properties, id, map) => {
        elements.push(
            <Fragment key={'fragment' + id}>
                <div className='d-flex' key={'header' + id}>
                    <Button className='bg-transparent border-0 me-1' size='lg' variant='danger' onClick={event => removeItem(id)}>
                        <FontAwesomeIcon icon={faMinus} color='red' />
                    </Button>
                    <Form.Control required key={'title' + id} size='lg' type='text' placeholder={t('uiItem', { i: i++ })} name={'title' + id} />
                </div>
            </Fragment>
        )
        items.get(id).forEach((type, title) => {
            var element
            if (type === 'boolean') {
                element = <Form.Check key={title + id} type='checkbox' label={title} id={title + id} />
            } else if (type === 'color') {
                element =
                    <div className='d-flex align-items-center'>
                        <Form.Control key={title + id} type='color' name={title + id} />
                    </div>
            } else if (type === 'image') {
                element = <Form.Control required type='file' id={title + id} accept='image/*' />
            } else {
                element = <Form.Control required key={title + id} type={items.get(id).get(title)} name={title + id} />
            }
            elements.push(
                <div className='d-flex my-3 align-items-center' key={'flex' + title + id}>
                    <Button className='bg-transparent border-0 me-1' variant='danger' key={'removeFieldButton' + id} onClick={event => deleteProperty(id, title)}>
                        <FontAwesomeIcon icon={faMinus} color='red' />
                    </Button>
                    <Form.Label className='mb-0 me-3'>
                        {title + ':'}
                    </Form.Label>
                    {element}
                </div>
            )
        })
        elements.push(
            <div className='d-flex my-3 align-items-center' key={'flex' + id}>
                <Button className='bg-transparent border-0 me-1' variant='success' key={'addFieldButton' + id} onClick={event => addProperty(id)}>
                    <FontAwesomeIcon icon={faPlus} color='green' />
                </Button>
                <Form.Label className='mb-0 me-3 text-nowrap'>
                    {t('uiAddFieldPrompt')}
                </Form.Label>
                <Form.Control className='me-3' type='text' id={'newFieldTitle' + id} placeholder={t('uiNewFieldTitle')} key={'newFieldTitle' + id} />
                <Form.Select id={'newFieldType' + id} key={'newFieldType' + id}>
                    <option value='text'>{t('uiText')}</option>
                    <option value='number'>{t('uiNumber')}</option>
                    <option value='image'>{t('uiImage')}</option>
                    <option value='date'>{t('uiDate')}</option>
                    <option value='color'>{t('uiColor')}</option>
                    <option value='boolean'>{t('uiBoolean')}</option>
                </Form.Select>
            </div>
        )
    })
    return (
        <>
            {elements}
            <Button className='float-end' variant='success' onClick={addItem}>
                <FontAwesomeIcon className='me-1' icon={faPlus} />
                {t('uiAddItem')}
            </Button>
        </>
    )
}
