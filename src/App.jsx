import Create from "./components/Create"
import Navbar from "./components/Navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Read from "./components/Read"
import  Update from "./components/Update.jsx"

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Create/>}></Route>
      <Route path="/read" element={<Read/>}></Route>
      <Route exact path="/edit/:id" element={<Update />} />
    </Routes>
    
    </BrowserRouter>
    
    
    </>
  )
}

export default App
