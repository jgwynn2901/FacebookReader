-- Table: "Facebook".users
DROP TABLE "Facebook".users;

CREATE SEQUENCE IF NOT EXISTS "Facebook".users_id_seq;

CREATE TABLE "Facebook".users
(
    id integer NOT NULL DEFAULT nextval('"Facebook".users_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
	email	character varying (50) COLLATE pg_catalog."default" NOT NULL,
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