import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import { useQuery } from '@apollo/client';
import { QUERY_TASKS } from '../utils/queries';

export default function Todo() {

const {loading, data, error }= useQuery(QUERY_TASKS);
// console.log(data.tasks);
const finished = [];
const toBeDone = [];
if( !loading ){

    data.tasks.forEach( (el) =>{
        console.log(el);
        el.status === 'completed' ? finished.push(el) : toBeDone.push(el);
    } )
}
//sort completed, and todo 
//use mutation to add a task, or remove
//rerun query
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
                        <Col>To Do:</Col>
                        <Col>Completed:</Col>
                    </Row>
                    {loading ? (<div>loading...</div>)
                    : 
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    {
                                        toBeDone.map((element, index) =>

                                        (

                                            <div key={index}>
                                                <h5 className='p-1'>{element.title}
                                                </h5>
                                                <p className='p-2'>
                                                    {element.description}
                                                </p>
                                            </div>
                                        )
                                        )
                                    }
                                </Stack>
                            </Col>
                            <Col>
                                <Stack gap={3}>
                                    {
                                        finished.map((element,index) => 
                                           
                                            (
                                                
                                                <div key={index}>
                                                    <h5 className='p-1'>{element.title}
                                                    </h5>
                                                    <p className='p-2'>
                                                    {element.description}
                                                    </p>
                                                </div>
                                            )
                                        )
                                    }
                                </Stack>
                            </Col>
                        </Row>}
                   
                </Container>
       </Container>
       </>
    )
}