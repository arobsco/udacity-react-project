import { Spinner } from 'react-bootstrap';

const LoadingSpinner = props => {
    return (
        <div className='text-center'><Spinner animation='grow' variant='info' /><br />{props.text}</div>
    )
}

export default LoadingSpinner;