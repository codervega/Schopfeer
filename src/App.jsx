import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utilites/appstore"; 
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";

import Edit from "./utilites/Edit";
import Task from "./Task";
import Delete from "./Delete";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<Task/>} />
          <Route path="/edit-task" element={<Edit/>} />
          <Route path="/list-all-task" element={<AllTask/>} />
           <Route path="/delete" element={< Delete/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
