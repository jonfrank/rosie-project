import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import Topic from './pages/Topic'

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/rosie-project' : ''
  
  return (
    <Router basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/topic/:slug/:type" element={<Topic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
