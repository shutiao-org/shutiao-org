CREATE TABLE "bonjour" (
	"user_id" text PRIMARY KEY NOT NULL,
	"bonjour_id" text,
	"bonjour_id_updated_at" timestamp,
	"bonjour_id_update_count" integer DEFAULT 0 NOT NULL,
	"avatar" text DEFAULT '' NOT NULL,
	"display_name" text DEFAULT '' NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bonjour_bonjour_id_unique" UNIQUE("bonjour_id")
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_uuid_unique";--> statement-breakpoint
ALTER TABLE "bonjour" ADD CONSTRAINT "bonjour_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "uuid";