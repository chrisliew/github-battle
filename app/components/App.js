import React from 'react';
import { Popular } from './Popular.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar } from './Navbar.js';
import { Home } from './Home.js';
import { Battle } from './Battle.js';
import { Results } from './Results.js';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            {/* This sends props to the results, which you have to grab from it. */}
            <Route path='/battle/results' component={Results} />
            <Route exact path='/popular' component={Popular} />
            <Route render={() =>  {
              return <p>Not Found</p>
              }}/>
          </Switch>
         
        </div>
      </Router>
    )
  }
}
