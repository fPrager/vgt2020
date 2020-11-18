CREATE TABLE "app"."Player" (
  id SERIAL PRIMARY KEY NOT NULL,
  key VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE "app"."Points" (
  id SERIAL PRIMARY KEY NOT NULL,
  "gameId" INTEGER NOT NULL,
  FOREIGN KEY ("gameId") REFERENCES "app"."Game"(id),
  "playerId" INTEGER NOT NULL,
  FOREIGN KEY ("playerId") REFERENCES "app"."Player"(id),
  "score" INTEGER NOT NULL
);

CREATE TABLE "app"."Game" (
  id SERIAL PRIMARY KEY NOT NULL,
  key VARCHAR(255) UNIQUE NOT NULL,
  rules TEXT,
  notes TEXT
);

CREATE TABLE "app"."VGT" (
  id SERIAL PRIMARY KEY NOT NULL,
  final BOOLEAN NOT NULL DEFAULT false
);

/*
CREATE TABLE "app"."Post" (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  content TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  "authorId" INTEGER NOT NULL,
  FOREIGN KEY ("authorId") REFERENCES "app"."User"(id)
);

CREATE TABLE "app"."Profile" (
  id SERIAL PRIMARY KEY NOT NULL,
  bio TEXT,
  "userId" INTEGER UNIQUE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "app"."User"(id)
);

*/