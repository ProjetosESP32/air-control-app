import { object, string } from 'yup'

export const loginValidation = object().shape({
  email: string().required('O e-mail é obrigatório').email('Digite um e-mail válido'),
  password: string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres'),
})
