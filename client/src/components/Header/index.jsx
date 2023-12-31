import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import { BsCheck2Circle } from 'react-icons/Bs'
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

const Header = () => {

    const { loading, data, error } = useQuery(QUERY_ME);
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.replace('/')
    };

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>TO-DO <BsCheck2Circle /></Navbar.Brand>
                {Auth.loggedIn() ? (
                    <>
                        <Navbar.Text>
                            Signed in as: {loading ? <p></p> : <i>{data.me.username}</i>}
                        </Navbar.Text>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </>
                ) : (
                    <Nav.Link href='/login'>Login</Nav.Link>
                )}
            </Container>
        </Navbar>
    )
};

export default Header;