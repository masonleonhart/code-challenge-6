import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Your saga should listen for the action type of `GET_ZOO_ANIMALS`
function* rootSaga() {
    yield takeEvery('GET_ZOO_ANIMALS', fetchZooAnimals);
    yield takeEvery('ADD_ANIMAL', addZooAnimal);
    yield takeEvery('FETCH_CLASSES', fetchZooClasses);
    yield takeEvery('ADD_CLASS', addNewClass);
}

function* fetchZooAnimals() {
    try {
        let response = yield axios.get('/zoo/animals')
        yield put({ type: 'SET_ZOO_ANIMALS', payload: response.data })
    } catch (error) {
        console.log('Error in fetching animals');
    };
};

function* fetchZooClasses() {
    try {
        let response = yield axios.get('/zoo/classes');
        yield put({ type: 'SET_CLASSES', payload: response.data });
    } catch (error) {
        console.log('Error in fetching classes');
    };
};

function* addZooAnimal(action) {
    try {
        yield axios.post('/zoo/animals', action.payload);
        yield put({ type: 'RESET_STATE' });
    } catch (error) {
        console.log('Error in adding animal');
    };
};

function* addNewClass(action) {
    try {
        yield axios.post('/zoo/classes', action.payload);
        yield put({ type: 'RESET_CLASS_REDUCER' });
    } catch (error) {
        console.log('Error in adding animal');
    }
};

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store class and number of unique animals in that class
const zooAnimals = (state = [], action) => {
    switch (action.type) {
        case 'SET_ZOO_ANIMALS':
            return action.payload;
        default:
            return state;
    }
}

const zooClasses = (state = [], action) => {
    switch (action.type) {
        case "SET_CLASSES":
            return action.payload;
        default:
            return state;
    };
};

const addAnimalReducer = (state = {name: '', class: 1}, action) => {
    let newState = {...state};
    
    switch (action.type) {
        case 'SET_NAME':
            newState.name = action.payload;
            return newState;
        case 'SET_CLASS':
            newState.class = Number(action.payload);
            return newState;
        case 'RESET_STATE':
            return {name: '', class: 1};
        default:
            return state;
    }
};

const addClassReducer = (state = {newClass: ''}, action) => {
    let newState = {...state};

    switch (action.payload) {
        case 'SET_NEW_CLASS':
            newState.newClass = action.payload;
            return newState;
        case 'RESET_CLASS_REDUCER':
            return {newClass: ''};
        default:
            return state;
    }
};

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        zooAnimals,
        zooClasses,
        addAnimalReducer,
        addClassReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
