import { UserProvider } from './context/user.context.jsx';
import { Admin } from './components/Admin.jsx';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';



function App() {


  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route  path='/' element={<Admin />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App


