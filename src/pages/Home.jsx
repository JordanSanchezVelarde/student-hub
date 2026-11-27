
import { Link } from 'react-router'
import {
  Plus,
  Calculator,
  Database,
  ClipboardList,
  ArrowUpRight,
  CodeXml
} from 'lucide-react'

const modules = [
  {
    name: 'SUM',
    description: 'Operaciones de suma',
    path: '/sum',
    icon: Plus,
    color: 'bg-blue-100 text-blue-600',
    available: false
  },
  {
    name: 'CALCULATOR',
    description: 'Calculadora estilo iPhone',
    path: '/calculator',
    icon: Calculator,
    color: 'bg-orange-100 text-orange-600',
    available: true
  },
  {
    name: 'API',
    description: 'Consumo de servicios web',
    path: '/api',
    icon: Database,
    color: 'bg-green-100 text-green-600',
    available: false
  },
  {
    name: 'FORM',
    description: 'Registro y validación de datos',
    path: '/form',
    icon: ClipboardList,
    color: 'bg-violet-100 text-violet-600',
    available: true
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <header className="flex items-center gap-4 mb-12">
          <div className="bg-indigo-600 p-4 rounded-2xl text-white">
            <CodeXml size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              DevHub
            </h1>
            <p className="text-slate-500">
              React Developer Toolkit
            </p>
          </div>
        </header>

        <h2 className="text-3xl font-bold text-slate-900">
          Panel de aplicaciones
        </h2>

        <p className="text-slate-500 mt-2 mb-8">
          Selecciona el módulo al que deseas acceder.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {modules.map(({ name, description, path,
            icon: Icon, color, available }) => (

            <Link
              key={name}
              to={path}
              className="group bg-white rounded-2xl p-7
                border border-slate-200 shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300"
            >

              <div className={`w-fit p-4 rounded-xl ${color}`}>
                <Icon size={28} />
              </div>

              <h3 className="text-xl font-bold mt-5 text-slate-900">
                {name}
              </h3>

              <p className="text-slate-500 mt-2">
                {description}
              </p>

              <div className="flex items-center justify-between mt-6">
                <span className={`text-sm font-medium ${
                  available ? 'text-green-600' : 'text-slate-400'
                }`}>
                  {available ? 'Disponible' : 'Pendiente'}
                </span>

                <ArrowUpRight
                  className="text-slate-400 group-hover:text-indigo-600"
                  size={22}
                />
              </div>

            </Link>

          ))}

        </div>

        <footer className="text-center text-sm text-slate-400 mt-12">
          Desarrollado con React, Tailwind CSS y React Router
        </footer>

      </div>
    </main>
  )
}
