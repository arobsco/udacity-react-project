import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaSignInAlt, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

import { userLogout } from '../../features/users/usersSlice';
import { getCurrentUserData } from '../../features/users/usersSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUserData = useSelector(getCurrentUserData);

    const logout = () => {
        dispatch(userLogout());
        navigate('/login');
    }

    return (
        <Navbar bg='dark' expand='lg' variant='dark'>
            <Container>
                <Navbar.Brand><FaQuestionCircle size={'2em'}/> Would You Rather?</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link as={Link} to='/'>Questions</Nav.Link>
                    <Nav.Link as={Link} to='/add'>Create a Question</Nav.Link>
                    <Nav.Link as={Link} to='/leaderboard'>Leaderboard</Nav.Link>
                </Nav>
                <Nav>
                    {currentUserData ?  
                        <Nav.Link onClick={logout}><img src={currentUserData.avatarURL} alt='test' width='30' height='30' className='d-inline-block align-top' /> {currentUserData.name} <FaSignOutAlt /></Nav.Link> : 
                        <Nav.Link as={Link} to='/login'><FaSignInAlt /> Login</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;