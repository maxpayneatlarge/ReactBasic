import React, { Component } from 'react';
import './App.css';
import Posts from './components/posts';
import Header from './components/header';
import Footer from './components/footer';

class App extends Component {


  render() {
    return (
      <div>
        <Header />
        <Posts />
        <Footer />
      </div>
    );
  }
}

export default App;
