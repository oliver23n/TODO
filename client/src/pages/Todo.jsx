import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

export default function Todo() {


    return (
       <>
       <Container>

                <Stack direction="horizontal" gap={3}>
                    <h3>NewTask</h3>  
                    <Form.Control className="me-auto" placeholder="Enter new task" />
                    <Button variant="primary">Save</Button>
                </Stack>
                <Container>
                    <Row>
                        <Col>TO be done</Col>
                        <Col>Completed</Col>
                    </Row>
                </Container>
       </Container>
       </>
    )
}