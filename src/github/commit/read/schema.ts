import { z } from 'zod';

export const gitCommitReadFormSchema = z.object({
  translate: z.boolean(),

  // when
  since: z
    .string()
    .refine(
      (value) => z.string().datetime().safeParse(`${value}T00:00:00Z`).success,
      { message: `Formato de data inválido` }
    )
    .refine(
      (value) => {
        const now = new Date(new Date().toISOString().split('T')[0]);
        const since = new Date(value);

        return now > since;
      },
      { message: `A data não pode ser maior que a atual` }
    ),
  until: z
    .string()
    .refine(
      (value) => z.string().datetime().safeParse(`${value}T00:00:00Z`).success,
      { message: `Formato de data inválido` }
    ),

  // dayTimes
  // Horário inicial do apontamento (no formato HH:MM).
  //   @IsMilitaryTime()
  // start: z.string().nonempty('O horário inicial é obrigatório'),
  // Horário final do apontamento (no formato HH:MM).
  //   @IsMilitaryTime()
  // end: z.string().nonempty('O horário final é obrigatório'),
});
