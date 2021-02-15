import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ClassForm() {
    const store = useSelector(store => store.addClassReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: 'ADD_CLASS', payload: store });
        history.push('/');
    };

    console.log(store)

    return (
        <form onSubmit={handleSubmit}>
            <br />
            <input placeholder='New Class' value={store.newClass} onChange={e => dispatch({ type: 'SET_NEW_CLASS', payload: e.target.value })} required />
            <br />
            <br />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default ClassForm;