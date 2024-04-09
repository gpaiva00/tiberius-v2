import * as React from 'react'

import { cn } from '@/shared/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md bg-white px-3 py-2 text-sm placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
