import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
   
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);  
        } catch (e) {
            console.error(e);
            handleShow();
        }
        setFormState({
            email: '',
            password: '',
        });
    };


    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Incorrect email or password</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        <Container className='mt-5 w-50'>

        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                name="email"
                onChange={handleChange}
                value={formState.email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password"
                name="password"
                placeholder="Enter Password"
                value={formState.password} 
                onChange={handleChange}
                />
            </Form.Group>
            <div className='d-flex justify-content-center m-1 '>
                
            <Button variant="dark" type="submit">
                Submit
            </Button>
            </div>
        </Form>
        <div className='d-flex justify-content-center m-1'>

        <Button href='/signup' variant='dark'>
            Sign Up instead
        </Button>
        </div>
                </Container>
        </>
    )
}