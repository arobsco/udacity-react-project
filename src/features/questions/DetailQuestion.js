import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAllUsers, getCurrentUserData } from '../users/usersSlice';

import NotFound from '../../common/components/NotFound';
import QuestionResult from './QuestionResult';
import { getSingleQuestion } from './questionsSlice';
import SingleQuestion from './SingleQuestion';

const DetailQuestion = () => {
    const { id } = useParams();
    const question = useSelector(state => getSingleQuestion(state, id));
    const users = useSelector(getAllUsers);
    const currentUserData = useSelector(getCurrentUserData);
    let usersArray = [];
    Object.keys(users).forEach(a => {usersArray.push(users[a])});


    if (question) {
        const authorData = users[question.author]
        const questionAnswered = currentUserData.answers[id] ? true : false;
        return  (
            <Col>
                <Row>
                    <SingleQuestion authorData={authorData} currentUserData={currentUserData} question={question} key={question.id} type={questionAnswered ? 'preview' : 'detail'} />
                    {questionAnswered ? <QuestionResult question={question} option={currentUserData.answers[id]} /> : ''}
                </Row>
            </Col>
        )
    } else {
        return <NotFound />
    }
    
}

export default DetailQuestion;