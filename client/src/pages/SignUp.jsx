import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/Container';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import { useState } from 'react';

export default function SignUp() {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [addProfile, { error, data }] = useMutation(ADD_PROFILE);


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
            const { data } = await addProfile({
                variables: { ...formState },
            });

            Auth.login(data.addProfile.token);
        } catch (e) {
            console.error(e);
        }
        setFormState({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <>
            <Container className='mt-5 w-50'>

                <Form onSubmit={handleFormSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"
                            name="username"
                            onChange={handleChange}
                            value={formState.username} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" placeholder="Enter e-mail"
                            name="email"
                            onChange={handleChange}
                            value={formState.email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleChange}
                            value={formState.password} />
                    </Form.Group>
                    <div className='d-flex justify-content-center m-1'>
                        <Button variant="dark" type="submit">
                            Sign Up!
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}