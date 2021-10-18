-- drop tables if they already exist
DROP TABLE IF EXISTS protected_animals;



CREATE TABLE "protected_animals" (
    "scientific" VARCHAR(255)   NOT NULL,
    "common" VARCHAR(255)   NOT NULL,
    "distribution" VARCHAR(255)   NOT NULL,
    "type" VARCHAR(255)   NOT NULL,
    "status" VARCHAR(255)   NOT NULL,
    "migratory" VARCHAR(255)   NOT NULL,
    "states" VARCHAR(255)   NOT NULL    
     );


-- View table columns and datatypes
SELECT * FROM protected_animals;