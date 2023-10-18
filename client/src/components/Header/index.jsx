import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Auth from '../../utils/auth';

const Header = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>Todos</Navbar.Brand>
                {Auth.loggedIn()? (
                    <>
                    <Navbar.Text>
                        Signed in as: <a>Mark Otto</a>
                    </Navbar.Text>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </>
                    ): (
                        <Nav.Link href='/login'>Login</Nav.Link>
                        )}
            </Container>
        </Navbar>
    )
};

export default Header;