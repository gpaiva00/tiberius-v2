import { z } from 'zod'

const TaskOutputSchema = z.object({
  tasks: z.array(z.object({
    id: z.string(),
    description: z.string(),
    deadline: z.string().optional(),
    resources: z.string().optional(),
    completed: z.boolean().optional(),
    placeholder: z.string().optional(),
    quadrant: z.enum([
      "Urgente e Importante",
      "Importante mas Não Urgente",
      "Urgente mas Não Importante",
      "Não Urgente e Não Importante"
    ]),
    priority: z.enum(["alta", "média", "baixa"]),
    recommendation: z.object({
      order: z.number(),
      description: z.string()
    }),
    lastOrganizedAt: z.number().optional()
  }))
})

type TaskOutput = z.infer<typeof TaskOutputSchema>

export { TaskOutputSchema }
export type { TaskOutput }

