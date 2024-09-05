import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'

import { SYSTEM_PROMPT } from '@/shared/constants'
import { TaskOutput, TaskOutputSchema } from '@/shared/types'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
})

async function getPromptResult(prompt: string): Promise<TaskOutput> {
  const result = await generateObject({
    model: groq('llama-3.1-8b-instant'),
    mode: 'tool',
    system: SYSTEM_PROMPT,
    prompt,
    schema: TaskOutputSchema,
    temperature: 0.3,
    maxTokens: 2048,
    output: 'object',
    topP: 0.9,
  })

  const parsed = TaskOutputSchema.parse(result.object)

  return parsed
}

export { getPromptResult }
