import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {Form2} from './components/Form2'
import Admin from './pages/Admin'



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/"/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
      </Router>
  )
}

export default App
