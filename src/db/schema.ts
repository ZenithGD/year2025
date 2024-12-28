import { InferModel, relations, sql } from 'drizzle-orm';
import { blob, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const puzzle = sqliteTable("puzzle", {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  size: integer('size').notNull(),
  difficulty: integer('difficulty').notNull().default(1),
  image: text('image').notNull()
});

export type PuzzleRowType = typeof puzzle.$inferSelect;
export type PuzzleRowInsertType = typeof puzzle.$inferInsert;

export const ranking = sqliteTable("ranking", {
  id: integer('id').references(() => puzzle.id).notNull(),
  uname: text('uname').notNull(),
  solveTS: text('solveTS')
  .notNull()
  .default(sql`(current_timestamp)`)
}, ranking => ({
    pk: primaryKey({ columns: [ranking.id, ranking.uname] })
  })
)

export type RankingRowType = typeof ranking.$inferSelect;
export type RankingRowInsertType = typeof ranking.$inferInsert;