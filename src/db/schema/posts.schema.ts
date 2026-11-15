import {pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core';

const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export { posts };
export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert;

export type UpdatePost = Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>;
export type PostWithId = Omit<Post, 'createdAt' | 'updatedAt'>;
export type PostWithTimestamps = Omit<Post, 'id'>;
export type PostWithIdAndTimestamps = Omit<Post, 'createdAt' | 'updatedAt'>;