import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../common/components/LoadingSpinner';
import { addQuestion } from './questionsSlice';

const AddQuestion = () => {
    const [optionOneText, setOptionOneText] = useState('');
    const [optionTwoText, setOptionTwoText] = useState('');
    const [validated, setValidated] = useState(false);
    const [status, setStatus] = useState('idle');
    const currentUser = useSelector(state => state.users.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onOptionOneChange = e => setOptionOneText(e.target.value);
    const onOptionTwoChange = e => setOptionTwoText(e.target.value);
    const submitQuestion = async e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.checkValidity() === false) {
            setValidated(true);
        } else {
            setStatus('pending');
            setValidated(true);
            await dispatch(addQuestion({ optionOneText, optionTwoText, author: currentUser })).then(() => {
                setOptionOneText('');
                setOptionTwoText('');
                setValidated(false);
                setStatus('idle');
                navigate('/');
            }
                )

        }
    }
    if (status === 'pending') {
        return <LoadingSpinner text='Please Wait... Submitting Question' />
    } else {
        return (
            <div>
                <h1 className='mb-4 display-3'>Would You Rather.....</h1>
                <Form onSubmit={submitQuestion} noValidate validated={validated}>
                    <Form.Group className='mb-3' controlId='optionOne'>
                        <Form.Label>Option One</Form.Label>
                        <Form.Control type='text' placeholder='Option One' onChange={onOptionOneChange} value={optionOneText} required />
                    </Form.Group>
                    <span className='lead'>OR</span>
                    <Form.Group className='mb-3 mt-3' controlId='optionTwo'>
                        <Form.Label>Option Two</Form.Label>
                        <Form.Control type='text' placeholder='Option Two' onChange={onOptionTwoChange} value={optionTwoText} required/>
                    </Form.Group>
                    <Button variant='primary' type='submit' disabled={status === 'pending' ? true : false}>Submit</Button>
                </Form>
            </div>
            )
        }
    } 

export default AddQuestion;