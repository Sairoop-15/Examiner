import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ExamPage from './pages/ExamPage'
import ResultsPage from './pages/ResultsPage'
import './App.css'

function App() {
  const [examData, setExamData] = useState(null)
  const [examResults, setExamResults] = useState(null)

  // Pass exam data between pages
  const startExam = (data) => {
    // Randomize question order
    const randomizedQuestions = [...data.questions].sort(() => Math.random() - 0.5)
    setExamData({
      ...data,
      questions: randomizedQuestions,
      startTime: new Date()
    })
    setExamResults(null)
  }

  // Set exam results
  const completeExam = (results) => {
    setExamResults(results)
  }

  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home onStartExam={startExam} />} />
          <Route 
            path="/exam" 
            element={
              examData ? 
                <ExamPage 
                  examData={examData} 
                  onCompleteExam={completeExam} 
                /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/results" 
            element={
              examResults ? 
                <ResultsPage 
                  results={examResults} 
                  examData={examData} 
                /> : 
                <Navigate to="/" />
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App