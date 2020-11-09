-- Table: "Facebook".users
DROP TABLE "Facebook".users;

DROP SEQUENCE "Facebook".users_id_seq;

CREATE SEQUENCE "Facebook".users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE "Facebook".users_id_seq
        OWNER TO jgwynn;


CREATE TABLE "Facebook".users
(
    id integer NOT NULL DEFAULT nextval('"Facebook".users_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
	email	character varying (100) COLLATE pg_catalog."default" UNIQUE NOT NULL,
	password character varying (100) NOT NULL,
	created timestamp DEFAULT now(),
	modified timestamp DEFAULT now(),	
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE "Facebook".users
    OWNER to jgwynn;
	
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_modtime BEFORE UPDATE ON "Facebook".users FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();	

-- Table: "Facebook".posts

DROP TABLE "Facebook".posts;

DROP SEQUENCE "Facebook".posts_id_seq;

CREATE SEQUENCE "Facebook".posts_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE "Facebook".posts_id_seq
        OWNER TO jgwynn;

CREATE TABLE "Facebook".posts
(
    id integer NOT NULL DEFAULT nextval('"Facebook".posts_id_seq'::regclass),
    user_id integer NOT NULL,
    "timestamp" integer,
    title character varying(255) COLLATE pg_catalog."default",
    post text COLLATE pg_catalog."default",
    created_dt timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT posts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE "Facebook".posts
    OWNER to jgwynn;

DROP TABLE "Facebook".media;

-- DROP SEQUENCE "Facebook".media_id_seq;

CREATE SEQUENCE "Facebook".media_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE "Facebook".media_id_seq
	OWNER TO jgwynn;

CREATE TABLE "Facebook".media
(
	id integer NOT NULL DEFAULT nextval('"Facebook".media_id_seq'::regclass),
	post_id integer NOT NULL,
	uri character varying(255) COLLATE pg_catalog."default",
    thumbnail varchar(255),
    media_data bytea,
	created_dt timestamp with time zone NOT NULL DEFAULT now(),
	CONSTRAINT media_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE "Facebook".media
	OWNER to jgwynn;

DROP TABLE "Facebook".media;

-- DROP SEQUENCE "Facebook".comments_id_seq;

CREATE SEQUENCE "Facebook".comments_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE "Facebook".comments_id_seq
	OWNER TO jgwynn;

CREATE TABLE  "Facebook".comments
(
  	id integer not null  DEFAULT nextval('"Facebook".comments_id_seq'::regclass),
	media_id integer not null,
	timestamp integer,
  	comment_text text ,
  	author varchar(255),
	created_dt timestamptz not null default now(),
    CONSTRAINT comments_pkey PRIMARY KEY (id)
);
