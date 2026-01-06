import { z } from 'zod'

// Server-side schema (uses English messages)
export const bonjourIdSchema = z
  .string()
  .min(3, { message: 'Bonjour ID must be at least 3 characters' })
  .max(18, { message: 'Bonjour ID must be at most 18 characters' })
  .regex(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Bonjour ID can only contain letters, numbers, underscores, and hyphens',
  })
