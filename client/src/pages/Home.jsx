import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Auth from '../utils/auth';
import Container from 'react-bootstrap/esm/Container';

export default function Home() {

    return (
        <Container >
            <div className='d-flex justify-content-center'>
             <h1>TODO! <Badge bg="secondary">!</Badge></h1>
            </div>
            {Auth.loggedIn() ? (<Button href='/todos'>My tasks</Button>):<p></p>
            }   
        </Container>
    )
}