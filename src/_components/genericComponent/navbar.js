import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PATHS from '../../_helpers/path';
import { logout } from '../../_slices/auth';

function NavbarComponent() {
    let history = useHistory()
    let dispatch = useDispatch()
    const handleLogout = () => {
        console.log('logging out')
        dispatch(logout())
        history.push('/')
    }
    return (
        <>
            <Navbar className='canvas-navbar'>
                <Container>
                    <Navbar.Brand className='canvas-trade'>
                    {// <img src='canvas-image.png' />
                    }
                    <h1>CanvasPad</h1>
                    </Navbar.Brand>
                    <Nav className="canvas-links">
                        <Nav.Link className="canvas-logout" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;
