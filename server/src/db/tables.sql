CREATE TABLE "Users" (
    "userID" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(255),
    "surname" VARCHAR(255),
    age INT,
    login VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    post VARCHAR(255)
);

CREATE TABLE "Flats" (
    "flatID" SERIAL PRIMARY KEY,
    "userID" INT REFERENCES "Users" ON DELETE CASCADE,
    cost INT,
    street VARCHAR(255),
    "houseNumber" VARCHAR(255),    
    rooms INT,
    "floor" INT,
    "square" INT,
    "apartmentCondition" VARCHAR(255),
    "builtYear" INT
); 

CREATE TABLE "PurchaseAgreement" (
    "purchaseAgreementID" SERIAL PRIMARY KEY,
    "userID" INT REFERENCES "Users" ON DELETE CASCADE,
    "flatID" INT REFERENCES "Flats" ON DELETE CASCADE,
    "description" VARCHAR(255),
    "date" DATE
);

CREATE TABLE "CachedFlats" (
    "flatID" INT,
    "userID" INT,
    cost INT,
    street VARCHAR(255),
    "houseNumber" VARCHAR(255),    
    rooms INT,
    "floor" INT,
    "square" INT,
    "apartmentCondition" VARCHAR(255),
    "builtYear" INT,
    "provider" VARCHAR(255) DEFAULT 'server'
);
