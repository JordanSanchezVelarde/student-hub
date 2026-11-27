
import { useState } from 'react'
import { Calculator as CalculatorIcon } from 'lucide-react'

const keys = [
  'AC', '+/-', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '−',
  '1', '2', '3', '+',
  '0', '.', '='
]

const operators = ['+', '−', '×', '÷']

function calculate(a, b, operator) {
  switch (operator) {
    case '+': return a + b
    case '−': return a - b
    case '×': return a * b
    case '÷': return b === 0 ? NaN : a / b
    default: return b
  }
}

function formatResult(number) {
  if (!Number.isFinite(number)) return 'Error'

  return String(Number(number.toPrecision(10)))
}

export default function Calculator() {

  const [display, setDisplay] = useState('0')
  const [previous, setPrevious] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waiting, setWaiting] = useState(false)

  // Reiniciar la calculadora
  function clear() {
    setDisplay('0')
    setPrevious(null)
    setOperator(null)
    setWaiting(false)
  }

  // Capturar los números
  function inputNumber(number) {
    if (waiting || display === 'Error') {
      setDisplay(number)
      setWaiting(false)
      return
    }

    if (display.length >= 12) return

    setDisplay(display === '0'
      ? number
      : display + number)
  }

  // Agregar un punto decimal
  function inputDecimal() {
    if (waiting || display === 'Error') {
      setDisplay('0.')
      setWaiting(false)
      return
    }

    if (!display.includes('.') && display.length < 12) {
      setDisplay(display + '.')
    }
  }

  // Seleccionar una operación
  function selectOperator(nextOperator) {

    if (display === 'Error') return

    let current = Number(display)

    if (operator && previous !== null && !waiting) {
      current = calculate(previous, current, operator)

      const result = formatResult(current)
      setDisplay(result)

      if (result === 'Error') {
        setPrevious(null)
        setOperator(null)
        setWaiting(true)
        return
      }
    }

    setPrevious(current)
    setOperator(nextOperator)
    setWaiting(true)
  }

  // Obtener el resultado
  function equals() {
    if (previous === null || operator === null) return
    if (display === 'Error') return

    const result = calculate(
      previous,
      Number(display),
      operator
    )

    setDisplay(formatResult(result))
    setPrevious(null)
    setOperator(null)
    setWaiting(true)
  }

  // Administrar los botones
  function handlePress(key) {

    if (key === 'AC') {
      clear()
    } else if (key === '+/-') {
      if (display !== 'Error') {
        setDisplay(formatResult(-Number(display)))
      }
    } else if (key === '%') {
      if (display !== 'Error') {
        setDisplay(formatResult(Number(display) / 100))
      }
    } else if (key === '.') {
      inputDecimal()
    } else if (key === '=') {
      equals()
    } else if (operators.includes(key)) {
      selectOperator(key)
    } else {
      inputNumber(key)
    }
  }

  // Estilos dinámicos de los botones
  function buttonStyle(key) {

    const base = `
      h-16 sm:h-18 rounded-full text-2xl
      font-medium transition-all duration-150
      active:scale-90 cursor-pointer
      focus-visible:outline-2
      focus-visible:outline-offset-2
      focus-visible:outline-white
    `

    if (operators.includes(key) || key === '=') {
      return `${base} ${
        operator === key && waiting
          ? 'bg-white text-[#ff9f0a]'
          : 'bg-[#ff9f0a] text-white hover:bg-orange-400'
      }`
    }

    if (['AC', '+/-', '%'].includes(key)) {
      return `${base} bg-[#a5a5a5] text-black
        hover:bg-slate-300`
    }

    if (key === '0') {
      return `${base} col-span-2 bg-[#333333]
        text-white hover:bg-[#555555] text-left pl-7`
    }

    return `${base} bg-[#333333]
      text-white hover:bg-[#555555]`
  }

  return (
    <main className="min-h-[calc(100vh-72px)]
      flex flex-col items-center justify-center
      bg-slate-100 px-4 py-8">

      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Calculadora
      </h1>

      <p className="text-slate-500 text-sm mb-6">
        Inspirada en el diseño de iOS
      </p>

      <section className="w-full max-w-[350px]
        bg-black rounded-[36px] p-5
        shadow-2xl border-4 border-slate-800">

        {/* Encabezado */}
        <div className="flex justify-between items-center
          text-gray-400 text-sm px-2">

          <CalculatorIcon size={20} />
          <span>Calculator</span>

        </div>

        {/* Pantalla */}
        <div className="h-36 flex flex-col
          justify-end text-right px-2 pb-4">

          <p className="text-gray-400 text-sm h-6">
            {previous !== null
              ? `${previous} ${operator}`
              : ''}
          </p>

          <div
            aria-live="polite"
            className={`text-white font-light
              tracking-tight tabular-nums ${
              display.length > 10
                ? 'text-3xl'
                : display.length > 7
                  ? 'text-5xl'
                  : 'text-6xl'
            }`}
          >
            {display}
          </div>

        </div>

        {/* Teclado */}
        <div className="grid grid-cols-4 gap-2.5">

          {keys.map(key => (
            <button
              type="button"
              key={key}
              onClick={() => handlePress(key)}
              className={buttonStyle(key)}
            >
              {key === '+/-' ? '±' : key}
            </button>
          ))}

        </div>

        {/* Barra inferior estilo iPhone */}
        <div className="flex justify-center mt-7 mb-1">
          <div className="w-28 h-1 bg-white rounded-full" />
        </div>

      </section>

      <p className="mt-6 text-xs text-slate-400">
        React · Tailwind CSS · useState
      </p>

    </main>
  )
}
