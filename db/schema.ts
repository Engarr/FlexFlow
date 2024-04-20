import { relations } from 'drizzle-orm';
import {
  integer,
  numeric,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
});

export const plansRelations = relations(plans, ({ many }) => ({
  planExercises: many(exerciseToPlan),
}));

export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  series: numeric('series').notNull(),
  weight: numeric('weight'),
});

export const exercisesRelations = relations(exercises, ({ many }) => ({
  plans: many(exerciseToPlan),
}));

export const exerciseToPlan = pgTable(
  'exercises_plan',
  {
    planId: integer('plan_id')
      .notNull()
      .references(() => plans.id),
    exerciseId: integer('exercise_id')
      .notNull()
      .references(() => exercises.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.exerciseId, t.planId] }),
  })
);
export const exerciseToPlanRelations = relations(exerciseToPlan, ({ one }) => ({
  plan: one(plans, {
    fields: [exerciseToPlan.planId],
    references: [plans.id],
  }),
  exercise: one(exercises, {
    fields: [exerciseToPlan.exerciseId],
    references: [exercises.id],
  }),
}));
