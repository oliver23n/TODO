import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Auth from '../utils/auth';
import Container from 'react-bootstrap/esm/Container';
import { BsCheck2Circle } from 'react-icons/Bs'

export default function Home() {

    return (
        <Container className='d-flex flex-column justify-content-center'>
            <div className='d-flex justify-content-center mt-5 p-2'>
                <h1>TO-DO <Badge bg="success"><BsCheck2Circle /></Badge></h1>
            </div>
            <div className='d-flex justify-content-center '>
                <div className='p-3 bg-body-tertiary border col-6'>
                    <p>
                        Effortlessly manage your tasks and to-dos with our intuitive TODO app. Stay organized, set priorities, and track your progress with ease.
                    </p>
                </div>
            </div>
            {Auth.loggedIn() ?
                (
                    <div className='d-flex justify-content-center m-4 p-2'>
                        <Button href='/todos' className='' variant='dark'>Go to My tasks</Button>
                    </div>
                )
                : <p></p>
            }
        </Container>
    )
}