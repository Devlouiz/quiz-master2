import Landingpage from './pages/Landingpage'
import Quizpage from './pages/Quizpage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landingpage/>}/>
          <Route path='/Quizpage' element={<Quizpage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
