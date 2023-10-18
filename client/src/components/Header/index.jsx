import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Auth from '../../utils/auth';

const Header = () => {

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Todos</Navbar.Brand>
                {Auth.loggedIn()? (
                    <>
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    <Nav.Link>Logout</Nav.Link>
                    </>
                    ): (
                        <Nav.Link>Login</Nav.Link>
                        )}
            </Container>
        </Navbar>
    )
};

export default Header;