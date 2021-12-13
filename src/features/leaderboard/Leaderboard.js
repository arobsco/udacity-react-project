import React from 'react';
import { Table, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { getAllUsers } from '../users/usersSlice';

const Leaderboard = () => {
    const users = useSelector(getAllUsers);
    let usersArray = [];
    Object.keys(users).forEach(a => {usersArray.push(users[a])});
    const usersSorted = usersArray.slice().sort((a,b) => (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length));
    return (
        <Col>
            <Row>
                <h1>Leaderboard</h1>
                <Table borderless hover className='align-middle'>
                    <thead className='table-dark text-center'>
                        <tr>
                            <th>User</th>
                            <th>Questions Asked</th>
                            <th>Questions Answered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersSorted.map(user => (
                            <tr key={user.id}>
                                <td><img src={user.avatarURL} height={100} width={100} alt={user.name} />{user.name}</td>
                                <td className='text-center'>{user.questions.length}</td>
                                <td className='text-center'>{Object.keys(user.answers).length}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Col>

    )
}

export default Leaderboard;