import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavbarMain from './components/layout/navbar';
import {Container} from 'react-bootstrap';
import PostState from './context/postState';
import Posts from './components/posts/posts';

function App() {
  return (
    <PostState>
      <Router>
        <div className="App">
        <NavbarMain />
        <Container>
          <Posts />
        </Container>
        </div>
      </Router>
    </PostState>
  );
}

export default App;
