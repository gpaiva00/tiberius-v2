import { z } from 'zod'

const TaskOutputSchema = z.object({
  tasks: z.array(z.object({
    id: z.number(),
    description: z.string(),
    deadline: z.string().optional(),
    resources: z.string().optional(),
    completed: z.boolean().optional(),
    placeholder: z.string().optional(),
    quadrant: z.enum([
      "urgente e importante",
      "importante mas não urgente",
      "urgente mas não importante",
      "não urgente e não importante"
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

