import { BrowserRouter, Routes, Route, Link, MemoryRouter } from 'react-router-dom'
import './index.css'
import AppList from './pages/AppList'
import AppMonitor from './pages/AppMonitor'
import { ToastProvider } from './components/Toast'

const Router = (() => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.getItem('test')
      return BrowserRouter
    }
  } catch (e) {
    console.warn('sessionStorage unavailable, using MemoryRouter')
  }
  return MemoryRouter
})()

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <Link to="/" className="text-xl font-bold">App Monitor</Link>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<AppList />} />
              <Route path="/apps/:id" element={<AppMonitor />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App
