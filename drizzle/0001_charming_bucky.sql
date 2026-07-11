ALTER TABLE "guest_book" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "guest_book_like" ALTER COLUMN "guest_book_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "guest_book_like" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE integer;