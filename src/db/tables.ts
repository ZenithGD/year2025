import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const puzzle = sqliteTable("puzzle", {
  id: integer('id').primaryKey(),
  es_title: text('es_title').notNull(),
  en_title: text('en_title').notNull(),
  fr_title: text('fr_title').notNull(),
  description: text('description'),
  size: integer('size').notNull().default(3),
  difficulty: integer('difficulty').notNull().default(1),
  image: text('image').notNull()
});

export type PuzzleRowType = typeof puzzle.$inferSelect;
export type PuzzleRowInsertType = typeof puzzle.$inferInsert;

export const ranking = sqliteTable("ranking", {
  id: integer('id').references(() => puzzle.id).notNull(),
  uname: text('uname').notNull(),
  solveTS: integer('solveTS')
  .notNull()
}, ranking => ({
    pk: primaryKey({ columns: [ranking.id, ranking.uname] })
  })
)

export type RankingRowType = typeof ranking.$inferSelect;
export type RankingRowInsertType = typeof ranking.$inferInsert;