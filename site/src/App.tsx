import './App.css';

import { Outlet } from 'react-router-dom';

function App() {
   return (
      <div className="App">
         <h1>React Router</h1>
         <Outlet></Outlet>
      </div>
   );
}

export default App;
