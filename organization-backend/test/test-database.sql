CREATE TABLE IF NOT EXISTS `positions`
(
    `position_id`        int          NOT NULL AUTO_INCREMENT,
    `position_number`    int          NOT NULL,
    `position_title`     varchar(255) NOT NULL,
    `parent_position_id` int DEFAULT NULL,
    PRIMARY KEY (`position_id`),
    KEY                  `parent_position_id` (`parent_position_id`),
    CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`parent_position_id`) REFERENCES `positions` (`position_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `positions`
VALUES (1, 1, 'Director', NULL),
       (2, 2, 'Senior Manager', 1),
       (3, 3, 'Senior Manager', 1),
       (4, 4, 'Manager', 2),
       (5, 5, 'Manager', 2),
       (6, 6, 'Manager', 3),
       (7, 7, 'Senior Developer', 4),
       (8, 8, 'Senior Developer', 6),
       (9, 9, 'Junior Developer', 7),
       (10, 95, 'Manager', 3);

CREATE TABLE IF NOT EXISTS `employees`
(
    `employee_id`     int          NOT NULL AUTO_INCREMENT,
    `first_name`      varchar(255) NOT NULL,
    `last_name`       varchar(255) NOT NULL,
    `employee_number` int          NOT NULL,
    `position_id`     int DEFAULT NULL,
    PRIMARY KEY (`employee_id`),
    KEY               `position_id` (`position_id`),
    CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `employees`
VALUES (1, 'John', 'Doe', 1001, 1),
       (2, 'Noah', 'Smith', 1002, 2),
       (3, 'Liam', 'Blue', 1003, 3),
       (4, 'Emma', 'Garcia', 1004, 4),
       (5, 'Ava', 'Martinez', 1005, 5),
       (6, 'Sophia', 'Rodriguez', 1006, 6),
       (7, 'Mia', 'Davis', 1007, 7),
       (8, 'Charlotte', 'Gonzalez', 1008, NULL),
       (9, 'Amelia', 'Hernandez', 1009, 9),
       (10, 'Harper', 'Wilson', 1010, NULL);




