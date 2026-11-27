import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  GraduationCap,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

import { registerSchema } from '../schemas/registerSchema'

export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      correo: '',
      carrera: '',
      password: '',
      terms: false
    }
  })

  const values = watch()
  const password = values.password || ''

  const rules = [
    { text: '8 caracteres mínimo', valid: password.length >= 8 },
    { text: 'Una mayúscula', valid: /[A-Z]/.test(password) },
    { text: 'Un número', valid: /[0-9]/.test(password) },
    { text: 'Un carácter especial', valid: /[^A-Za-z0-9]/.test(password) }
  ]

  const strength = rules.filter(rule => rule.valid).length

  const progress = Math.round([
    values.nombre.trim().length >= 3,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo),
    Boolean(values.carrera),
    strength === 4,
    values.terms
  ].filter(Boolean).length / 5 * 100)

  const onSubmit = () => {
    setSuccess(true)
  }

  const inputStyle = (field) => `
    w-full rounded-xl border p-3 outline-none
    transition focus:ring-2 focus:ring-indigo-500
    ${errors[field]
      ? 'border-red-500 bg-red-50'
      : 'border-slate-300 bg-white'}
  `

  const errorMessage = (field) => (
    errors[field] && (
      <p role="alert" className="mt-1 text-sm text-red-500">
        {errors[field].message}
      </p>
    )
  )

  return (
    <main className="min-h-screen flex items-center
      justify-center bg-slate-100 p-5">

      <section className="w-full max-w-lg bg-white
        rounded-3xl shadow-xl p-6 sm:p-8">

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 text-white
            p-3 rounded-xl">
            <GraduationCap size={28} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              StudentHub
            </h1>
            <p className="text-sm text-slate-500">
              Plataforma de gestión académica
            </p>
          </div>
        </div>

        {success ? (

          <div className="text-center py-8">
            <CheckCircle className="mx-auto text-green-500
              mb-4" size={64} />

            <h2 className="text-2xl font-bold">
              ¡Validación exitosa!
            </h2>

            <p className="text-slate-500 my-4">
              Tus datos cumplen todas las validaciones.
            </p>

            <button
              onClick={() => {
                reset()
                setSuccess(false)
                setShowPassword(false)
              }}
              className="bg-indigo-600 text-white
                rounded-xl p-3 w-full"
            >
              Nuevo registro
            </button>
          </div>

        ) : (

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>
              <h2 className="text-2xl font-bold">
                Crea tu cuenta
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Completa tu información académica.
              </p>
            </div>

            {/* Barra de progreso */}
            <div>
              <div className="flex justify-between
                text-sm mb-2 text-slate-500">
                <span>Progreso del formulario</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 bg-slate-200
                rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600
                    transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label htmlFor="nombre"
                className="block font-medium mb-2">
                Nombre completo
              </label>

              <input
                id="nombre"
                {...register('nombre')}
                placeholder="Ej. Juan Pérez"
                className={inputStyle('nombre')}
                autoComplete="name"
                aria-invalid={!!errors.nombre}
              />

              {errorMessage('nombre')}
            </div>

            {/* Correo */}
            <div>
              <label htmlFor="correo"
                className="block font-medium mb-2">
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                {...register('correo')}
                placeholder="estudiante@universidad.edu.ec"
                className={inputStyle('correo')}
                autoComplete="email"
                aria-invalid={!!errors.correo}
              />

              {errorMessage('correo')}
            </div>

            {/* Carrera */}
            <div>
              <label htmlFor="carrera"
                className="block font-medium mb-2">
                Carrera universitaria
              </label>

              <select
                id="carrera"
                {...register('carrera')}
                className={inputStyle('carrera')}
                aria-invalid={!!errors.carrera}
              >
                <option value="">Selecciona tu carrera</option>
                <option>Sistemas de Información</option>
                <option>Ingeniería de Software</option>
                <option>Ciencias de la Computación</option>
                <option>Administración de Empresas</option>
                <option>Otra</option>
              </select>

              {errorMessage('carrera')}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password"
                className="block font-medium mb-2">
                Contraseña
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Crea una contraseña"
                  className={`${inputStyle('password')} pr-12`}
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                />

                <button
                  type="button"
                  aria-label={showPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3
                    text-slate-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errorMessage('password')}

              {/* Indicador de seguridad */}
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`h-1.5 flex-1 rounded-full
                      transition-all
                      ${strength >= level
                        ? strength === 4
                          ? 'bg-green-500'
                          : strength >= 2
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        : 'bg-slate-200'
                      }`}
                  />
                ))}
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Seguridad: {
                  ['Vacía', 'Débil', 'Regular', 'Buena', 'Fuerte'][strength]
                }
              </p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                {rules.map(rule => (
                  <span
                    key={rule.text}
                    className={`text-xs flex items-center gap-1
                      ${rule.valid
                        ? 'text-green-600'
                        : 'text-slate-400'}`}
                  >
                    <CheckCircle size={14} />
                    {rule.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Términos */}
            <div>
              <label className="flex items-center gap-2
                text-sm text-slate-600">

                <input
                  type="checkbox"
                  {...register('terms')}
                  className="size-4 accent-indigo-600"
                />

                Acepto los términos y condiciones.
              </label>

              {errorMessage('terms')}
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              className="w-full bg-indigo-600
                hover:bg-indigo-700 text-white
                font-semibold rounded-xl p-3
                flex justify-center items-center
                gap-2 transition cursor-pointer"
            >
              Crear cuenta
              <ArrowRight size={18} />
            </button>

          </form>

        )}

      </section>
    </main>
  )
}