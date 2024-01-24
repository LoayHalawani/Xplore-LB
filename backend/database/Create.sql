CREATE DATABASE xplorelb_db;

USE xplorelb_db;

CREATE TABLE roles(
  roleId INT PRIMARY KEY AUTO_INCREMENT,
  name ENUM("admin", "manager", "tourist") NOT NULL
);

CREATE TABLE users(
  userId INT PRIMARY KEY AUTO_INCREMENT,
  roleId INT,
  username VARCHAR(255) UNIQUE NOT NULL, 
  password VARCHAR(255) UNIQUE NOT NULL, 
  name VARCHAR(255) NOT NULL, 
  email VARCHAR(255) UNIQUE NOT NULL, 
  gender ENUM('Male', 'Female') NOT NULL, 
  profileImage VARCHAR(255) NULL, 
  dateOfBirth DATETIME NOT NULL,
  FOREIGN KEY(roleId) REFERENCES roles(roleId) ON DELETE CASCADE
);

CREATE TABLE sites(
  siteId INT PRIMARY KEY AUTO_INCREMENT,
  userId INT, 
  name VARCHAR(255) UNIQUE NOT NULL, 
  location ENUM("Beirut", "Akkar", "North", "Mt. Lebanon", "South", "Baalbek-Hermel", "Beqaa", "Nabatieh") NOT NULL,
  description VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  type ENUM("Historical", "Natural", "Retail", "Industrial", "Academic", "Residential", "Athletics", "Entertainment",
  "Religious", "Medical", "Government", "Artistic", "Culinary", "Transportation", "Cultural") NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE bookmarks(
  bookmarkId INT PRIMARY KEY AUTO_INCREMENT, 
  userId INT, 
  siteId INT, 
  FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE, 
  FOREIGN KEY(siteId) REFERENCES sites(siteId) ON DELETE CASCADE
);

CREATE TABLE critiques(
  critiqueId INT PRIMARY KEY AUTO_INCREMENT,
  userId INT, 
  siteId INT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment VARCHAR(255) NOT NULL, 
  date DATETIME NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE, 
  FOREIGN KEY(siteId) REFERENCES sites(siteId) ON DELETE CASCADE
);
