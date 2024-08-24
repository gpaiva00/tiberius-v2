import { z } from 'zod'

const TaskInputSchema = z.object({
  tasks: z.array(z.object({
    description: z.string(),
    deadline: z.string().optional(),
    resources: z.string().optional(),
    quadrant: z.enum([
      "urgente e importante",
      "importante mas não urgente",
      "urgente mas não importante",
      "não urgente e não importante"
    ]).optional(),
    priority: z.enum(["alta", "média", "baixa"]).optional(),
    recommendation: z.object({
      order: z.number().optional(),
      description: z.string().optional()
    })
  }))
})

type TaskInput = z.infer<typeof TaskInputSchema>

export { TaskInputSchema }
export type { TaskInput }

