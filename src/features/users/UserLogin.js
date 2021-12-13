import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAllUsers, userLogin } from './usersSlice';

import LoadingSpinner from '../../common/components/LoadingSpinner';

const UserLogin = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(getAllUsers);
    const status = useSelector(state => state.users.status);
    const loggedInPath = (!props.requestedPath || props.requestedPath === '/login') ? '/' : props.requestedPath;
    const onChange = e => {
        dispatch(userLogin(e.target.value));
        navigate(loggedInPath);
    };

    if (status === 'completed') {
        return (
            <Row>
                <Col>
                    <h2 className='mb-3'>Welcome to the Udacity Would You Rather Experience!</h2>
                    <p>Please sign in to continue.</p>
                    <Form>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <Form.Group className='mt-3' controlId='user'>
                                    <Form.Label>Choose a User</Form.Label>
                                    <Form.Select onChange={onChange}>
                                        <option>Choose a user to log in as.</option>
                                        {Object.keys(users).map(user => (
                                            <option value={users[user].id} key={users[user].id}>{users[user].name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
    
                    </Form>
                </Col>
            </Row>
        )
    } else {
       return <LoadingSpinner text='Priming the warpdrive...' />
    }


};

export default UserLogin;