import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Board from './pages/Board/Board';

function Home(): React.ReactElement {
  return <div>THIS IS FIRST PAGE</div>;
}

function App(): React.ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/board">
                <Board />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
