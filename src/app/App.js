import React, { useEffect }  from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchQuestions } from '../features/questions/questionsSlice';

import Header from '../common/components/Header';
import Leaderboard from '../features/leaderboard/Leaderboard';
import AddQuestion from '../features/questions/AddQuestion';
import Questions from '../features/questions/QuestionsList';
import UserLogin from '../features/users/UserLogin';
import DetailQuestion from '../features/questions/DetailQuestion';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.questions.status);
  const currentUser = useSelector(state => state.users.currentUser);
  useEffect(() => {
      if (status === 'initial') {
          dispatch(fetchQuestions());
      }
  }, [status, dispatch]);

    return (
      <Container fluid>
          <Row className='mb-4'>
            <Col md={12}>
              <Header/>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              {!currentUser ? 
                <UserLogin requestedPath={window.location.pathname} />
                :
                (<Routes>
                  <Route exact path='/' element={<Questions />}/>
                  <Route path='/leaderboard' element={<Leaderboard />} />
                  <Route path='/add' element={<AddQuestion />} />
                  <Route path='/login' element={<UserLogin />} />
                  <Route path='/question/:id' element={<DetailQuestion/>} />
              </Routes>
              )}
            </Col>
            <Col md={3}></Col>
          </Row>
      </Container>
  );


}

export default App;
