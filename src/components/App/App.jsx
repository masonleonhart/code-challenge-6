import AnimalList from '../AnimalList/AnimalList'
import AnimalForm from '../AnimalForm/AnimalForm'
import ClassForm from '../ClassForm/ClassForm'
import './App.css';

import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  // Renders the entire app on the DOM
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Zoo Animals</h1>
          <nav>
            <Link to='/'>Animal List</Link>
            <Link to='/form'>Add Animal</Link>
            <Link to='/class'>Add Class</Link>
          </nav>
        </header>
        <Switch>
          <Route exact path='/'>
            <AnimalList />
          </Route>
          <Route path='/form' >
            <AnimalForm />
          </Route>
          <Route path='/class' >
            <ClassForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
