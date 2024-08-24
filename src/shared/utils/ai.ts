import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'

import { SYSTEM_PROMPT } from '@/shared/constants'
import { TaskOutput, TaskOutputSchema } from '@/shared/types'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.OPENAI_API_KEY,
})

async function getPromptResult(prompt: string): Promise<TaskOutput> {
  const result = await generateObject({
    model: groq('llama3-8b-8192'),
    mode: 'json',
    system: SYSTEM_PROMPT,
    prompt,
    schema: TaskOutputSchema,
  })

  const parsed = TaskOutputSchema.parse(result)

  return parsed
}

export { getPromptResult }
