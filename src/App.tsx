import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Board from './pages/Board/Board';
import Home from './pages/Home/Home';

function App(): React.ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
