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

  dayTimes: z
    .array(
      z.object({
        // Horário inicial do apontamento (no formato HH:MM).
        //   @IsMilitaryTime()
        start: z.string().nonempty('O horário inicial é obrigatório'),
        // Horário final do apontamento (no formato HH:MM).
        //   @IsMilitaryTime()
        end: z.string().nonempty('O horário final é obrigatório'),
      })
    )
    .min(1, 'Insira pelo menos 1 horário')
    .refine((times) => {
      const aux = times.map((time) => JSON.stringify(time));

      return aux.length === new Set(aux).size;
    }, 'Os horários não podem ser repetidos!'),
});
