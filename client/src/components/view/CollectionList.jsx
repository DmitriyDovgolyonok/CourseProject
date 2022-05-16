import { pathCollection } from 'paths'
import { Nav } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'

export default function CollectionList({ collections }) {
    const { t } = useTranslation()
    return (
        <Row xs={1} md={2} lg={3} xxl={4} className='g-3'>
            {
                collections.map((item, i) =>
                    <Col key={'CollectionListCol' + i}>
                        <Card key={'CollectionListCard' + i}>
                            {
                                item.preview
                                    ? <Link key={'CollectionListLink' + i} className='text-center' to={pathCollection + '/' + item._id}>
                                        <Card.Img key={'CollectionListImg' + i} className='item-image' variant='top' src={item.preview} />
                                    </Link>
                                    : <Nav.Link key={'CollectionListLink' + i} className='h5 mb-0 text-center' as={Link} to={pathCollection + '/' + item._id}>
                                        {t('uiNoPreview')}
                                    </Nav.Link>
                            }
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <ReactMarkdown children={item.description} remarkPlugins={[remarkGfm]} />
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }
        </Row>
    )
}
