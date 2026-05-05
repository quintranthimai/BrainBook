-- Chạy bằng superuser (thường là postgres). Tạo role + database khớp backend/.env mặc định.
-- User: brainbook | Password: brainbook | Database: brainbook

DO $body$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'brainbook') THEN
    CREATE ROLE brainbook LOGIN PASSWORD 'brainbook' INHERIT;
  END IF;
END
$body$;

SELECT format('CREATE DATABASE %I OWNER %I', 'brainbook', 'brainbook')
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'brainbook');
\gexec

GRANT ALL PRIVILEGES ON DATABASE brainbook TO brainbook;
