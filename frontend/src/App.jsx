//https://www.youtube.com/watch?v=y2Kxmvaew90
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Body from './components/Body'
import {Toaster} from 'react-hot-toast'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Body/>
      <Toaster/>
    </>
  )
}

export default App
