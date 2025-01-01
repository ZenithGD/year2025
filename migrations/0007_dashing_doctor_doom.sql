ALTER TABLE `puzzle` RENAME COLUMN "title" TO "es_title";--> statement-breakpoint
ALTER TABLE `puzzle` ADD `en_title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `puzzle` ADD `fr_title` text NOT NULL;