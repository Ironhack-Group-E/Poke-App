CREATE DATABASE pokemon;
USE pokemon;

CREATE TABLE trainer (
id INT AUTO_INCREMENT NOT NULL,
trainer_name VARCHAR(255),
age INT,
hobby VARCHAR(255),
photo VARCHAR(255),
PRIMARY KEY (id)
);

CREATE TABLE team (
id INT AUTO_INCREMENT NOT NULL,
trainer INT,
pokemon1 INT,
pokemon2 INT,
pokemon3 INT,
pokemon4 INT,
pokemon5 INT,
pokemon6 INT,
pokemon7 INT,
PRIMARY KEY (id),
 FOREIGN KEY (trainer) REFERENCES trainer(id)
);