
import Navbar from "./component/layout/Navbar";
import Home from "./component/pages/Home"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import AddNotes from "./component/notes/AddNotes";
import EditNotes from "./component/notes/EditNotes";
import Notes from "./component/notes/Notes";



function App() {
  return (
    <>
    <Router>
   <Navbar />
   
   <div className="container">
    
  <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addnotes" element={<AddNotes/>}/>
      <Route path="/editnotes/:id" element={<EditNotes/>}/>
      <Route path="/notes/:id" element={<Notes/>}/>
  </Routes>
     
    </div>
    </Router>
      </>
  );
}

export default App;
