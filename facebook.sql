-- Table: "Facebook".users
DROP TABLE "Facebook".users;

CREATE SEQUENCE IF NOT EXISTS "Facebook".users_id_seq;

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
    OWNER to postgres;
	
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

CREATE TABLE "Facebook".posts
(
    id integer NOT NULL DEFAULT nextval('"Facebook".posts_id_seq'::regclass),
    user_id integer NOT NULL,
    "timestamp" integer,
    title character varying(255) COLLATE pg_catalog."default",
    post text COLLATE pg_catalog."default",
    uri character varying(128) COLLATE pg_catalog."default",
    created_dt timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT posts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE "Facebook".posts
    OWNER to postgres;