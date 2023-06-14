import { useState } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'

const App = () => {
  const [words, setWords] = useState<String>('')

  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox words={words} />
          <TextArea setWords={setWords} />
          <BottomResultBox words={words} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
