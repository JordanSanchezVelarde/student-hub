import { z } from 'zod'

export const registerSchema = z.object({

  nombre: z.string()
    .trim()
    .min(3, 'Ingresa al menos 3 caracteres'),

  correo: z.string()
    .email('Ingresa un correo electrónico válido'),

  carrera: z.string()
    .min(1, 'Selecciona una carrera'),

  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Incluye una mayúscula')
    .regex(/[0-9]/, 'Incluye un número')
    .regex(/[^A-Za-z0-9]/, 'Incluye un carácter especial'),

  terms: z.boolean()
    .refine(value => value === true, {
      message: 'Debes aceptar los términos'
    })

})