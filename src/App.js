import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from'./components/container/Navbar/Navbar';
import Store from'./components/container/Store/Store';
import routes from './routes';
import Footer  from './components/container/Footer';



function App() {
  return (
    <div className="App">
      <Navbar />
      {routes}
      <Footer />
      
    </div>
  );
}

export default App;
