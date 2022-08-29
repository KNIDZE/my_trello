import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Board from './pages/Board/Board';

function Home(): React.ReactElement {
  return <div>THIS IS FIRST PAGE</div>;
}

function App(): React.ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="Board" element={<Board />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
