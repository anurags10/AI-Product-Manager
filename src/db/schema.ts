import { relations } from 'drizzle-orm';
import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('passwordHash'), // nullable for Google users
    provider: text('provider').notNull().default('credentials'), // credentials | google
    providerId: text('provider_id'), // Google sub id
    createdAt: timestamp('createdAt').defaultNow(),
  },
  pgTable => {
    return {
      emailIndex: uniqueIndex('emailIndex').on(pgTable.email),
    };
  }
);

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId').references(() => users.id),
  name: text('name').notNull(),
  prdText: text('prdText').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const roadmaps = pgTable('roadmaps', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('projectId').references(() => projects.id),
  roadmapData: jsonb('roadmapData').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

// Relationships

export const usersRelation = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  roadmaps: many(roadmaps),
}));

export const roadmapsRelations = relations(roadmaps, ({ one }) => ({
  project: one(projects, {
    fields: [roadmaps.projectId],
    references: [projects.id],
  }),
}));
