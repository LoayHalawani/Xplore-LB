CREATE DATABASE xplorelb_db;

USE xplorelb_db;

CREATE TYPE role_names AS ENUM ('admin', 'manager', 'tourist');

CREATE TABLE roles(
  roleId SERIAL PRIMARY KEY,
  name role_names NOT NULL
);

CREATE TYPE genders AS ENUM ('Male', 'Female');

CREATE TABLE users(
  userId SERIAL PRIMARY KEY,
  roleId INT,
  username VARCHAR(255) UNIQUE NOT NULL, 
  password VARCHAR(255) UNIQUE NOT NULL, 
  name VARCHAR(255) NOT NULL, 
  email VARCHAR(255) UNIQUE NOT NULL, 
  gender genders NOT NULL, 
  profileImage VARCHAR(255) NULL, 
  dateOfBirth TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  FOREIGN KEY(roleId) REFERENCES roles(roleId) ON DELETE CASCADE
);

CREATE TYPE locations AS ENUM ('Beirut', 'Akkar', 'North', 'Mt. Lebanon', 'South', 'Baalbek-Hermel', 'Beqaa', 'Nabatieh');

CREATE TYPE types AS ENUM ('Historical', 'Natural', 'Retail', 'Industrial', 'Academic', 'Residential', 'Athletics', 'Entertainment', 'Religious', 'Medical', 'Government', 'Artistic', 'Culinary', 'Transportation', 'Cultural');

CREATE TABLE sites(
  siteId SERIAL PRIMARY KEY,
  userId INT, 
  name VARCHAR(255) UNIQUE NOT NULL, 
  location locations NOT NULL,
  description VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  type types NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE bookmarks(
  bookmarkId SERIAL PRIMARY KEY, 
  userId INT, 
  siteId INT, 
  FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE, 
  FOREIGN KEY(siteId) REFERENCES sites(siteId) ON DELETE CASCADE
);

CREATE TABLE critiques(
  critiqueId SERIAL PRIMARY KEY,
  userId INT, 
  siteId INT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment VARCHAR(255) NOT NULL, 
  date TIMESTAMP NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE, 
  FOREIGN KEY(siteId) REFERENCES sites(siteId) ON DELETE CASCADE
);
