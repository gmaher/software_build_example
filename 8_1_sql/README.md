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
* **DEC(PRE,POST)/DEC(PRECISION,SCALE)** - decimal, floating point number, *PRE* and *POST* are number of digits before and after the decimal. *PRECISION* and is the total number o significant digits and *SCALE* is the number of significant digits after the decimal.
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

Can also do multiple inserts simultaneously
```SQL
INSERT INTO table_name
  (column_name1, column_name2)
VALUES
  ('value11', 'value12'),
  ('value21', 'value22');
```
#### data with special characters
If we have data that has an apostrophe in it, e.g. `company - Bob's Whelks`, we need to escape the apostrophe with a backslash `\`
```SQL
INSERT INTO customers
  (name, company)
VALUES
  ('John Doe', 'Bob\'s Whelks');
```

#### null columns
We can insert data while omitting certain columns, the inserted data will then have `NULL` as a value for those columns.

Note that `NULL` values will always compare to false, that is `NULL == NULL` is false.
# Selecting data (querying)
## Select all data from a table
```SQL
SELECT * FROM table_name;
```
## select only specific columns
```SQL
SELECT column1, column2, column3 FROM table_name
where column = value;
```

## Filter on a column value
```SQL
SELECT * FROM table_name WHERE column_name = value;
```
Can also use other comparison operators such as `<` and `>`, `<=`, `>=` and `<>` (not equal to).

Note that comparison operators work for strings, and will compare them alphabetically.

Note that if `value` had an apostrophe here, we would also have to escape it with a backslash `\`, or use double quotes `''`.

### filter on multiple conditions
Can use the `AND` operator and the `OR` operator.
```SQL
SELECT column1, column2
FROM table_name
WHERE column_a = value_a
AND column_b = value_b;
```
to find `NULL` we can use the `IS NULL` operator.
```SQL
SELECT column1, column2
FROM table_name
WHERE column_a = value_a
AND column_b IS NULL;
```
We can also select for ranges
```SQL
SELECT column1, column2
FROM table_name
WHERE column_a <= 10
AND column_a => 30;
```
or using the `BETWEEN` statement
```SQL
SELECT column1, column2
FROM table_name
WHERE column_a BETWEEN 10 and 30;
```
Similarly `WHERE NOT column BETWEEN` selects everything outside the range (note the `NOT` is before the column name)

We can select for multiple values at a time using the `IN` statement
```SQL
SELECT * from table_name
WHERE column in (value1, value2, value3);
```
Similarly `NOT IN` will select for all rows with values not equal to those specified (note the `NOT` is after the column name here).

### Filter for partial matches (wildcards)
We can use `LIKE` and the wildcard symbol `%` to select rows with columns that partially match an expression.
```SQL
SELECT * FROM table_name
WHERE column LIKE '%value';
```
will select every row from `table_name` where `column` ends in `value`

We can use the `_` wildcard to select rows where the column has only one character in addition to the expression
```SQL
SELECT * FROM table_name
WHERE column LIKE '_value';
```

# Modifying data (Update and Delete)
## Delete
```SQL
DELETE FROM table_name
where column_name = value;
```
Of course we can use any combination of conditions with `DELETE` as we did with `SELECT`.

`DELETE` will delete all records matching the `WHERE` clause so we need to make sure it matches only the records we really want to delete.

**Tip**: We can always try a `SELECT` first with the same `WHERE` condition to see what rows we are about to delete.

## Updating with Insert and Delete
To update a row, we can insert a new row with the updated values and delete the old one.

## Updating in one step with the `UPDATE` command
```SQL
UPDATE table_name
SET column_name = value
WHERE other_column = other_value;
```
We can also do multiple `SET`s at the same time
```SQL
UPDATE table_name
SET column1 = value1,
column2 = value2
WHERE other_column = other_value;
```
Not that if we leav out the `WHERE` clause *every row* will be updated with the `SET` values, which we probably do not want.

### Variable updates
Sometimes we want to modify a column relative to it's current values, e.g. *increase every person's age by 1*, we can use `UPDATE` commands for this and use the column name as a *variable value*.
```SQL
UPDATE table_name
SET
column = column+1;
```

# Table Design
A table typically describes one **thing/object**, e.g. a person's information. If we wanted to include data on people's cars we would use a **separate car table** and then include a **relationship** between the person and car tables.

When the data has been broken down into the smallest pieces that make sense it is called **atomic**. Often the way we break the data into atomic pieces depends on how we want to use the data. What information are do we need to search for often, etc.?

## Primary keys
A primary key is a column in our table that makes every row unique, for example and account number or personal identification number.

Note that primary keys, by their definition, cannot be `NULL` and must be assigned when inserting every row.

### Creating Data with primary keys
To use primary keys we need to specify one of the table columns as a primary key when creating the table.
```SQL
CREATE TABLE table_name
(
  column1 type1,
  column2 type2,
  column3 type3,
  PRIMARY KEY (column1)
);
```
However, this way we will have to specify the primary key value ourselves every time a row is created. An alternative is to let the SQL database software keep track of the primary key for us, using the `AUTO_INCREMENT` specifier.
```SQL
CREATE TABLE table_name
(
  id INT NOT NULL AUTO_INCREMENT,
  column1 value1,
  column2 value2,
  PRIMARY KEY(id)
);
```
Now when we insert a new row and leave the primary key value unspecified, the SQL software will automatically assign a value for us.

# Altering tables
We can use the `ALTER` command to add new columns to a table.
```SQL
ALTER TABLE table_name
ADD COLUMN column_name column_type;
```
We can specify the position of the new column too using `AFTER` or `BEFORE`
```SQL
ALTER TABLE table_name
ADD COLUMN column_name column_type
AFTER other_column;
```

Adding a new primary key can be done with the alter command.
```SQL
ALTER TABLE table_name
ADD COLUMN id INT NOT NULL AUTO_INCREMENT FIRST,
ADD PRIMARY KEY(id);
```

We can also rename a table
```SQL
ALTER TABLE table_name
RENAME TO other_name;
```

We can also change the name and type of a column
```SQL
ALTER TABLE table_name
CHANGE COLUMN original_name new_name type;
```
and we can do multiple changes at the same time
```SQL
ALTER TABLE table_name
CHANGE COLUMN original_name1 new_name1 type1,
CHANGE COLUMN original_name2 new_name2 type2;
```

What if we only want to change the type and not the name? We can use the `MODIFY`
```SQL
ALTER TABLE table_name
MODIFY COLUMN column1 new_type;
```

What if we want to remove a column? We can use the `DROP` command
```SQL
ALTER TABLE table_name
DROP COLUMN column_name;
```

#Advanced Selecting
When selecting data we can order the data and group it as well as perform math operations on it.

We can order the results of a query by using the `ORDER BY` command
```SQL
SELECT * FROM table_name
ORDER BY column;
```

We can use the `CASE` command to make updates based on multiple conditions
```SQL
UPDATE table_name
SET column =
CASE
  WHEN column1 = value1 THEN newvalue1
  WHEN column2 = value2 THEN newvalue2
  ELSE newvalue3
END;
```
