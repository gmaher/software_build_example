# SQL

SQL is a programming language for managing databases. SQL is uses to interface with an **SQL server**, a datbase software that stores the data it is given, listens for SQL commands, and reads and writes the data accordingly.

See e.g.

MYSQL: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04

PostgresSQL: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04

## SQL database organization

Within a given SQL server we often define **users**

Data is stored in **tables**

Tables are stored in **Databases**

Users can be **granted** access to operations on specific databases.

Databases are stored on disk and managed by the SQL server software.

## SQL shell
SQL is similar to an interpreted programming language in that the SQL server software will interpret the commands we type, like a shell program.

## SQL commands
Note SQL is case-insensitive, but SQL keywords are written in caps to add clarity.

Spaces cannot be used in variable names as spaces indicate the start of a new SQL token.

Semicolons `;` are used at the end of SQL commands to signify the end of a command.
## user commands

## database commands

### Create a database
```SQL
CREATE DATABASE database_name;
```
e.g.
```SQL
CREATE DATABASE gregs_list;
```

### Delete a database
```SQL
DROP DATABASE database_name;
```

### Use a database
Causes all subsequent SQL commands to refer to the selected database (e.g. creating tables).
```SQL
USE database_name;
```
Note in postgres instead use the `\c` command
```SQL
\c database_name
```
## tables commands
### Creating a table
```SQL
CREATE TABLE table_name
(
  var_name VAR_TYPE,
  var_name VAR_TYPE
);
```
e.g.
```SQL
CREATE TABLE doughnut_list
(
  doughnut_name VARCHAR(10),
  doughnut_type TEXT
);
```
We can also specify columns to never be `NULL` using the `NOT NULL` tag
```SQL
CREATE TABLE table_name
(
  var_name VAR_TYPE NOT NULL,
  var_name VAR_TYPE
);
```
We can also set default values for certain columns, so that if they are not specified during an insert, they receive the default value.
```SQL
CREATE TABLE table_name
(
  var_name VAR_TYPE DEFAULT default_value,
  var_name VAR_TYPE
);
```
#### variable types
Sometimes variable types are different depending on the SQL server software used.
* **DEC(PRE,POST)** - decimal, floating point number, *PRE* and *POST* are number of digits before and after the decimal.
* **CHAR(LENGTH)** - character, fixed length strings
* **DATETIME/TIMESTAMP**, date and time data
* **DATE**, date only
* **TIME**, only time
* **VARCHAR(LENGTH)**, text data up to 255 chars in length
* **INT/INTEGER**, integer data (can be negative)
* **BLOB/TEXT**, variable length text data

### Describe a table
```SQL
DESC table_name;
```
Note in postgres use the `\d` command
```SQL
\d database_name
```
### Inserting data into a table
```SQL
INSERT INTO table_name
  (column_name1, column_name2)
VALUES
  ('value1', 'value2');
```
Note the `''` marks for strings, numbers don't need them.

#### null columns
We can insert data while omitting certain columns, the inserted data will then have `NULL` as a value for those columns.

Note that `NULL` values will always compare to false, that is `NULL == NULL` is false.
### Selecting data
```SQL
SELECT * FROM table_name;
```
