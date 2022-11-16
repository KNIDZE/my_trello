import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Favicon from 'react-favicon';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import { CardModal } from './pages/Board/components/Card/CardModal/CardModal';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';

function App(): React.ReactElement {
  useEffect(() => {
    document.title = 'SimpleBoards';
  });
  return (
    <div className="App">
      <Favicon url="src/favic.ico" />
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/board/:boardId" element={<Board />}>
              <Route path="card/:cardId" element={<CardModal lists={[]} />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
