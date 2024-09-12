import { z } from 'zod'

const TaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  deadline: z.string().optional(),
  resources: z.string().optional(),
  completed: z.boolean(),
  placeholder: z.string().optional(),
  quadrant: z.enum([
    "Urgente e Importante",
    "Importante mas Não Urgente",
    "Urgente mas Não Importante",
    "Não Urgente e Não Importante"
  ]).optional(),
  priority: z.enum(["alta", "média", "baixa"]).optional(),
  recommendation: z.object({
    order: z.number().optional(),
    description: z.string().optional()
  }),
  lastOrganizedAt: z.number().optional()
})

const TaskInputSchema = z.object({
  tasks: z.array(TaskSchema)
})

type TaskInput = z.infer<typeof TaskInputSchema>
type Task = z.infer<typeof TaskSchema>

export { TaskInputSchema }
export type { Task, TaskInput }

