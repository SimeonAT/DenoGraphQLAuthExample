CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO auth (id, email, passwordhash, salt, scopes) VALUES ('6e007ce8-7a29-470a-9d87-c2dae1d9728e', 'simeonat@notrealemail.com', crypt('simeonat', '66ce678d7f0f0025a95b3aaebc5ee29c'), '66ce678d7f0f0025a95b3aaebc5ee29c', jsonb_build_array('user'));
INSERT INTO auth (id, email, passwordhash, salt, scopes) VALUES ('4b456188-75c5-4dc8-b644-7d42490cfd52', 'rocketraccoon@guardians.com', crypt('raccoon', '9ec8f370f2a5e5141afd4f1802d8dabb'), '9ec8f370f2a5e5141afd4f1802d8dabb', jsonb_build_array('user', 'admin'));

INSERT INTO usertable (id, userdata) VALUES ('6e007ce8-7a29-470a-9d87-c2dae1d9728e', jsonb_build_object('username', 'SimeonAT'));
INSERT INTO usertable (id, userdata) VALUES ('4b456188-75c5-4dc8-b644-7d42490cfd52', jsonb_build_object('username', 'RocketRaccoon'));