ALTER TABLE `notes` RENAME COLUMN `description` TO `content`;--> statement-breakpoint
DROP INDEX IF EXISTS `notes_title_unique`;