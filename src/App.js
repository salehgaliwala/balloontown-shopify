import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Settings from './Settings';
function App() {
  document.title = 'Balloon Town App';
  return (
    <div className="App">
      <Header />
      <main>
        {/* Your main content goes here */}
        <Settings />
      </main>

      <Footer />
    </div>
  );
}

export default App;
