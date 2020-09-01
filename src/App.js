import React from 'react';
import './App.css';
import Navbar from'./components/container/Navbar/Navbar';
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
