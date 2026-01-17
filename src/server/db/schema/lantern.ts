import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const lanterns = pgTable('lantern', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Lantern = typeof lanterns.$inferSelect
export type NewLantern = typeof lanterns.$inferInsert
