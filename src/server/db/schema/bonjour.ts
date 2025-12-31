import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const bonjour = pgTable('bonjour', {
  userId: text('user_id')
    .primaryKey()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  bonjourId: text('bonjour_id').unique(),
  bonjourIdUpdatedAt: timestamp('bonjour_id_updated_at'),
  bonjourIdUpdateCount: integer('bonjour_id_update_count').default(0).notNull(),
  avatar: text('avatar').default('').notNull(),
  displayName: text('display_name').default('').notNull(),
  bio: text('bio').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})
