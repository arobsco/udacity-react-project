import React from 'react';
import { Row, ProgressBar } from 'react-bootstrap';

const QuestionResult = props => {
    const optionOneVotes = props.question.optionOne.votes.length;
    const optionTwoVotes = props.question.optionTwo.votes.length;
    const totalVotes = optionOneVotes+optionTwoVotes;
    return (
        <Row>
            <ProgressBar now={optionOneVotes} max={totalVotes} className='p-0'/>
            <span className={`text-center ${props.option === 'optionOne' ? 'fw-bold': ''}`}>{props.question.optionOne.text} - Total Votes: {optionOneVotes} - {Math.round((optionOneVotes/totalVotes)*100)}%</span>
            <ProgressBar now={optionTwoVotes} max={totalVotes} className='p-0'/>
            <span className={`text-center ${props.option === 'optionTwo' ? 'fw-bold': ''}`}>{props.question.optionTwo.text} - Total Votes: {optionTwoVotes} - {Math.round((optionTwoVotes/totalVotes)*100)}%</span>
        </Row>
    )
}

export default QuestionResult;