CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO auth (id, email, passwordhash, salt, scopes) VALUES ('6e007ce8-7a29-470a-9d87-c2dae1d9728e', 'simeonat@notrealemail.com', crypt('simeonat', '6e007ce87a29470a9d87c2dae1d9728e'), '6e007ce87a29470a9d87c2dae1d9728e', jsonb_build_array('user'));
INSERT INTO auth (id, email, passwordhash, salt, scopes) VALUES ('4b456188-75c5-4dc8-b644-7d42490cfd52', 'rocketraccoon@guardians.com', crypt('raccoon', '4b45618875c54dc8b6447d42490cfd52'), '4b45618875c54dc8b6447d42490cfd52', jsonb_build_array('user', 'admin'));

INSERT INTO usertable (id, userdata) VALUES ('6e007ce8-7a29-470a-9d87-c2dae1d9728e', jsonb_build_object('username', 'SimeonAT'));
INSERT INTO usertable (id, userdata) VALUES ('4b456188-75c5-4dc8-b644-7d42490cfd52', jsonb_build_object('username', 'RocketRaccoon'));