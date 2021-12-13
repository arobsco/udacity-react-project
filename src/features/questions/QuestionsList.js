import React, { useState } from 'react';
import { ButtonGroup, Col, Row, ToggleButton } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllQuestions } from './questionsSlice';
import { getAllUsers, getCurrentUserData } from '../users/usersSlice';

import LoadingSpinner from '../../common/components/LoadingSpinner';
import SingleQuestion from './SingleQuestion';

const QuestionsList = () => {
    const [filter, setFilter] = useState('unanswered');
    const questions = useSelector(getAllQuestions);
    const users = useSelector(getAllUsers);
    const currentUserData = useSelector(getCurrentUserData)
    const status = useSelector(state => state.questions.status);

    if (status === 'completed') {
        const filteredQuestions = (filter === 'unanswered') ? Object.values(questions).filter(question => currentUserData.answers[question.id] === undefined) : Object.values(questions).filter(question => currentUserData.answers[question.id] !== undefined);
        const orderedQuestions = filteredQuestions.slice().sort((a,b) => b.timestamp - a.timestamp);
        return (
            <Col>
            <Row>
                <ButtonGroup className='mb-4'>
                    <ToggleButton key={1} id='radio1' type='radio' name='radio' value='unanswered' checked={filter === 'unanswered'} onChange={() => setFilter('unanswered')} variant='outline-info'>Unanswered Questions</ToggleButton>
                    <ToggleButton key={2} id='radio2' type='radio' name='radio' value='answered' checked={filter === 'answered'} onChange={() => setFilter('answered')} variant='outline-info'>Answered Questions</ToggleButton>
                </ButtonGroup>
            </Row>
            <Row xs={1} md={2} className='g-4'>
                {orderedQuestions.map(question => {
                    const authorData = users[question.author];
                    return (
                        <Link to={`/question/${question.id}`} key={question.id} className='text-decoration-none text-dark'>
                            <SingleQuestion authorData={authorData} currentUserData={currentUserData} question={question} key={question.id} type='preview' />
                        </Link>
                    )
                    })
                }
            </Row>
            </Col>
        )
    } else {
        return <LoadingSpinner text='Loading....' />
    }
}

export default QuestionsList;