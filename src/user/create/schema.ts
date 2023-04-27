import { z } from 'zod';

export const userCreateFormSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter no mínimo 8 caracteres'),
    email: z
      .string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato de e-mail inválido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordConfirmation: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'A senha e a confirmação de senha, devem ser iguais',
    path: ['passwordConfirmation'],
  });
