import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const apps = pgTable('apps', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    packageId: text('package_id').notNull().unique(),
    playStoreUrl: text('play_store_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const screenshots = pgTable('screenshots', {
    id: uuid('id').primaryKey().defaultRandom(),
    appId: uuid('app_id').references(() => apps.id, { onDelete: 'cascade' }).notNull(),
    fileName: text('file_name').notNull(),
    takenAt: timestamp('taken_at').defaultNow().notNull(),
})
