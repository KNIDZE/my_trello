import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import { CardModal } from './pages/Board/components/Card/CardModal/CardModal';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';

function App(): React.ReactElement {
  return (
    <div className="App">
      <Helmet>
        <title>Simple Boards</title>
      </Helmet>
      <Router>
        <Routes>
          <Route path="/board/:boardId/" element={<Board />}>
            <Route path="card/:cardId" element={<CardModal />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
