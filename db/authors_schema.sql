
USE fan_theories_db;

CREATE TABLE theories(
    id INTEGER(10) NOT NULL AUTO_INCREMENT,
    author_name VARCHAR(30) NOT NULL,
    creator VARCHAR(30) NOT NULL,
    date_posted TIMESTAMP,
    theory VARCHAR(160) NOT NULL,
    likes INTEGER DEFAULT 0,
    PRIMARY KEY (id)
);

SELECT * FROM theories;