import { object, ref, string } from 'yup'

export const registerValidation = object().shape({
  username: string()
    .required('O nome de usuário é obrigatório')
    .min(2, 'O nome de usuário deve ter pelo menos dois caracteres')
    .max(55, 'O nome de usuário deve ter até 55 caracteres'),
  email: string().required('O e-mail é obrigatório').email('O e-mail deve ser válido'),
  password: string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(16, 'A senha deve ter no máximo 16 caracteres'),
  passwordConfirmation: string()
    .required('A confirmação de senha é obrigatória')
    .equals([ref('password')], 'As senhas não batem'),
})
