
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router'

import { ArrowLeft, CodeXml } from 'lucide-react'

import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Sum from './pages/Sum'
import Api from './pages/Api'

import RegisterForm from './components/RegisterForm'

function Navigation() {

  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }

  return (
    <nav className="h-[72px] bg-white border-b
      border-slate-200 px-6 flex items-center
      justify-between">

      <Link
        to="/"
        className="flex items-center gap-2 text-slate-600
          hover:text-indigo-600 transition font-medium"
      >
        <ArrowLeft size={20} />
        Volver al inicio
      </Link>

      <Link
        to="/"
        className="flex items-center gap-2
          font-bold text-indigo-600"
      >
        <CodeXml size={24} />
        DevHub
      </Link>

    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>

      <Navigation />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/sum" element={<Sum />} />

        <Route
          path="/calculator"
          element={<Calculator />}
        />

        <Route path="/api" element={<Api />} />

        <Route path="/form" element={<RegisterForm />} />

        <Route
          path="*"
          element={
            <div className="p-12 text-center">
              <h1 className="text-3xl font-bold">
                Página no encontrada
              </h1>
              <Link to="/" className="text-indigo-600">
                Regresar al inicio
              </Link>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App
