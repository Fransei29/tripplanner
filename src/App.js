import React from 'react';
import './App.css';
import Trip from './components/Trip';
import Expense from './components/Expenses';


function App() {
  return (
      <div className="box">
        <Trip />
        <Expense />
      </div>
  );
}

export default App;
