import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import { useState } from 'react';

export default function SignUp() {
    const [formState, setFormState] = useState({ 
        username:'',
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
            username:'',
            email: '',
            password: '',
        });
    };

    return (
        <>
            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Please enter Username"
                    name="username"
                    onChange={handleChange}
                    value={formState.username} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={formState.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formState.password} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign Up!
                </Button>
            </Form>
        </>
    )
}