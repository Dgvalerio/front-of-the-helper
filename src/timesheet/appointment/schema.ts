import { z } from 'zod';

export const appointmentSchema = z.object({
  appointments: z
    .array(
      z.object({
        client: z
          .object({ label: z.string(), value: z.string() })
          .refine(
            (data) =>
              !(
                data === null ||
                data.value === undefined ||
                data.label === undefined
              ),
            {
              message: 'O cliente é obrigatório.',
            }
          ),
        project: z
          .object({ label: z.string(), value: z.string() })
          .refine(
            (data) =>
              !(
                data === null ||
                data.value === undefined ||
                data.label === undefined
              ),
            {
              message: 'O projeto é obrigatório.',
            }
          ),
        category: z
          .object({ label: z.string(), value: z.string() })
          .refine(
            (data) =>
              !(
                data === null ||
                data.value === undefined ||
                data.label === undefined
              ),
            {
              message: 'A categoria é obrigatória.',
            }
          ),
        date: z.string().nonempty('A data é obrigatória.'),
        start: z.string().nonempty('A horário inicial é obrigatória.'),
        end: z.string().nonempty('A horário final é obrigatória.'),
        description: z.string().nonempty('A descrição é obrigatória.'),
      })
    )
    .min(1, 'Insira pelo menos 1 apontamento'),
});
