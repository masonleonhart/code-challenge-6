import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function AnimalForm() {
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: 'ADD_ANIMAL', payload: store.addAnimalReducer });
        history.push('/');
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_CLASSES' });
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <br />
            <input placeholder='Animal Name' value={store.addAnimalReducer.name} onChange={e => dispatch({ type: 'SET_NAME', payload: e.target.value })} required />
            <br />
            <br />
            <label htmlFor="class">Animal Class</label>
            <br />
            {store.zooClasses.map((zooClass, i) => {
                return (
                    <span key={i}>
                        <label htmlFor={zooClass.class_name}>{zooClass.class_name}</label>
                        <input type='radio' name='class' id={zooClass.class_name} value={zooClass.id} checked={store.addAnimalReducer.class === zooClass.id} onChange={e => dispatch({ type: 'SET_CLASS', payload: e.target.value })} />
                    </span>
                );
            })}
            <br />
            <br />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default AnimalForm;