CREATE TABLE "Users" (
    "userID" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(255),
    "surname" VARCHAR(255),
    age INT,
    login VARCHAR(255),
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

CREATE TABLE "AccountOfContracts" (
    "accountOfContractsID" SERIAL PRIMARY KEY,
    meetings INT,
    "completedTransactions" INT
);
CREATE TABLE "Reports" (
    "reportID" SERIAL PRIMARY KEY,
    "accountOfContractsID" INT REFERENCES "AccountOfContracts" ON DELETE CASCADE,
    date DATE,
    "number" INT,
    type VARCHAR(255),
    "serialNumber" VARCHAR(255),
    "documents" VARCHAR(512)
);
CREATE TABLE "PurchaseAgreement" (
    "purchaseAgreementID" SERIAL PRIMARY KEY,
    "accountOfContractsID" INT REFERENCES "AccountOfContracts" ON DELETE CASCADE,
    "userID" INT REFERENCES "Users" ON DELETE CASCADE,
    "description" VARCHAR(255),
    date DATE,
    "agreementNumber" INT
);