ALTER TABLE "user" ADD COLUMN "member_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "uuid" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_member_id_unique" UNIQUE("member_id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_uuid_unique" UNIQUE("uuid");