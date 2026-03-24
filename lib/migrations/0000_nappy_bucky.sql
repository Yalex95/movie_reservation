CREATE TABLE "actor" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "actor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp,
	"phone" text,
	"is_active" boolean,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cast" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cast_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"actor_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	"character_name" text NOT NULL,
	"role_order" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cinema_room" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cinema_room_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text,
	"capacity" integer,
	"room_type" text,
	"banned" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "genere" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "genere_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"genere" text
);
--> statement-breakpoint
CREATE TABLE "language" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "language_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"language" text
);
--> statement-breakpoint
CREATE TABLE "movie" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movie_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text,
	"duration" text,
	"poster_image" text,
	"trailer_url" text,
	"content_rating" text DEFAULT 'AA',
	"release_status" text DEFAULT 'coming_soon',
	"realease_date" text,
	"start_showing_date" text,
	"end_showing_date" text,
	"is_featured" boolean DEFAULT false,
	"is_now_showing" boolean DEFAULT false,
	CONSTRAINT "movie_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "movie_genres" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movie_genres_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"movie_id" integer,
	"genre_id" integer
);
--> statement-breakpoint
CREATE TABLE "movie_languages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movie_languages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"movie_id" integer,
	"language_id" integer
);
--> statement-breakpoint
CREATE TABLE "movie_projection_formats" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movie_projection_formats_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"movie_id" integer,
	"format_id" integer
);
--> statement-breakpoint
CREATE TABLE "pricing" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pricing_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"showtime_id" integer NOT NULL,
	"price" integer,
	"currency" text,
	"base_price" integer
);
--> statement-breakpoint
CREATE TABLE "format" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "format_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"format" text
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reservations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"showtime_id" integer NOT NULL,
	"status" text,
	"created_at" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seat" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "seat_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cinnema_room_id" integer NOT NULL,
	"row" text DEFAULT 'regular',
	"seat_number" integer,
	"seat_type" text
);
--> statement-breakpoint
CREATE TABLE "seat_reservation" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "seat_reservation_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"reservation_id" integer NOT NULL,
	"seat_id" integer NOT NULL,
	"showtime_id" integer NOT NULL,
	"price_paid" integer
);
--> statement-breakpoint
CREATE TABLE "showtime" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "showtime_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"movie_id" integer NOT NULL,
	"cinema_room_id" integer NOT NULL,
	"start_datetime" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cast" ADD CONSTRAINT "cast_actor_id_actor_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."actor"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cast" ADD CONSTRAINT "cast_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movie"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movie"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_genre_id_genere_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genere"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_languages" ADD CONSTRAINT "movie_languages_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movie"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_languages" ADD CONSTRAINT "movie_languages_language_id_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_projection_formats" ADD CONSTRAINT "movie_projection_formats_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movie"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_projection_formats" ADD CONSTRAINT "movie_projection_formats_format_id_format_id_fk" FOREIGN KEY ("format_id") REFERENCES "public"."format"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pricing" ADD CONSTRAINT "pricing_showtime_id_showtime_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."showtime"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_showtime_id_showtime_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."showtime"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat" ADD CONSTRAINT "seat_cinnema_room_id_cinema_room_id_fk" FOREIGN KEY ("cinnema_room_id") REFERENCES "public"."cinema_room"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat_reservation" ADD CONSTRAINT "seat_reservation_reservation_id_reservations_id_fk" FOREIGN KEY ("reservation_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat_reservation" ADD CONSTRAINT "seat_reservation_seat_id_seat_id_fk" FOREIGN KEY ("seat_id") REFERENCES "public"."seat"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat_reservation" ADD CONSTRAINT "seat_reservation_showtime_id_showtime_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."showtime"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movie"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_cinema_room_id_cinema_room_id_fk" FOREIGN KEY ("cinema_room_id") REFERENCES "public"."cinema_room"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");