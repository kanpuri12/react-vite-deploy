import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import WebDevelopment from './pages/services/WebDevelopment'
import MobileDevelopment from './pages/services/MobileDevelopment'
import CloudInfra from './pages/services/CloudInfra'
import SystemDesign from './pages/services/SystemDesign'
import GenAIPoC from './pages/services/GenAIPoC'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="services/web" element={<WebDevelopment />} />
          <Route path="services/mobile" element={<MobileDevelopment />} />
          <Route path="services/cloud" element={<CloudInfra />} />
          <Route path="services/system-design" element={<SystemDesign />} />
          <Route path="services/genai" element={<GenAIPoC />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
