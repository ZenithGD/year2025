CREATE TABLE `puzzle` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`size` integer NOT NULL,
	`difficulty` text
);
--> statement-breakpoint
CREATE TABLE `ranking` (
	`id` integer NOT NULL,
	`uname` text NOT NULL,
	PRIMARY KEY(`id`, `uname`),
	FOREIGN KEY (`id`) REFERENCES `puzzle`(`id`) ON UPDATE no action ON DELETE no action
);
