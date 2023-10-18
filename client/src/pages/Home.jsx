import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Auth from '../utils/auth';

export default function Home() {

    return (
        <>

            <h2>TODO! <Badge bg="secondary">!</Badge></h2>
            {Auth.loggedIn() ? (<Button href='/todos'>My tasks</Button>):<p></p>
            }   
        </>
    )
}