ALTER TABLE `puzzle` ALTER COLUMN "size" TO "size" integer NOT NULL DEFAULT 3;--> statement-breakpoint
ALTER TABLE `puzzle` ADD `description` text;