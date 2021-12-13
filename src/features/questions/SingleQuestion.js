import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchQuestions, questionVote } from './questionsSlice';

const SingleQuestion = props => {
    const {question, authorData, currentUserData, type} = props;
    const dispatch = useDispatch();
    const onClick = async e => {
        console.log(currentUserData.id, question.id, e.target.id);
        await dispatch(questionVote({authedUser: currentUserData.id, qid: question.id, answer: e.target.id})).then(
            dispatch(fetchQuestions())
        );
    };
    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title><img src={authorData.avatarURL} alt={authorData.name} height='30' width='30' /> {(authorData.id === currentUserData.id) ? 'You' : authorData.name} asked</Card.Title>
                    <Card.Subtitle>
                        Would You Rather...
                    </Card.Subtitle>
                    <Card.Text className='text-center'>
                        <Button className='m-3 fw-bold' disabled={type === 'preview' ? true : false } variant={type ==='preview' ? '' : 'outline-info'} id='optionOne' onClick={onClick}>{question.optionOne.text}</Button>
                        <Button className='fw-bold' disabled={type === 'preview' ? true : false } variant={type ==='preview' ? '' : 'outline-info'} id='optionTwo' onClick={onClick}>{question.optionTwo.text}</Button>
                    </Card.Text>
                    <Card.Footer className='mt-3'>Asked On: {new Date(question.timestamp).toDateString()}</Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SingleQuestion;