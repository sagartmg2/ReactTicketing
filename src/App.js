import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './page/Home';
import Show from './page/Ticket/Show';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './component/Navbar';
import Login from './page/Auth/Login';
import Signup from './page/Auth/Signup';

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="tickets" >
              <Route path=":id" element={<Show />} />
            </Route>
          </Route>
        </Routes>
      </div>

    </>

  );
}

export default App;
