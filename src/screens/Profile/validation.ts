import { object, string } from 'yup'

export const profileValidation = object().shape({
  username: string()
    .min(2, 'O nome de usuário deve ter pelo menos dois caracteres')
    .max(55, 'O nome de usuário deve ter até 55 caracteres'),
  email: string().email('O e-mail deve ser válido'),
})
