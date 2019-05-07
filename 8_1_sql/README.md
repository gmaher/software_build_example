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
Can also use other comparison operators such as `<` and `>`, `<=`, `>=` and `<>`, `!=` (not equal to).

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
WHERE column_name = value;
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
Note that if we leav out the `WHERE` clause *every row* will be updated with the `SET` values, which we probably do not want.

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

# Advanced Selecting
When selecting data we can order the data and group it as well as perform math operations on it.

We can order the results of a query by using the `ORDER BY` command (results will be ordered by ascending order)
```SQL
SELECT * FROM table_name
ORDER BY column;
```
we can order by multiple columns too
```SQL
SELECT * FROM table_name
ORDER BY column1, column2;
```
We can order by descending order by using the `DESC` descriptor
```SQL
SELECT * FROM table_name
ORDER BY column1 DESC;
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

The `GROUP BY` command will collapse our results into one row for each category in the specified column. Note that since it collapses the data, we need to use an `aggregate` function in our select statement.
```SQL
SELECT column1, AVG(column2) FROM table_name
GROUP BY column1
```

## SQL functions
We can use functions to compute derivations of the data we are working with
```SQL
SELECT SUM(column)
FROM table_name;
```
Will sum all the `column` etnries of the rows in `table_name`. Similarly we can use `AVG`, `MIN`, `MAX`.

`COUNT` will count the number of rows returned from a query.

## Distinct keyword
`DISTINCT` will select all the distinct values from a column
```SQL
SELECT DISTINCT column FROM table;
```

## Limit
The limit keyword can be used to limit the number of results returned by the select query
```SQL
SELECT * FROM table_name
LIMIT 2;
```
we can use `LIMIT` with two numbers to search through different ranges of rows
```SQL
SELECT * FROM table_name
LIMIT 10, 20;
```
will return the 10th through the 20th result.

## Substring
The `SUBSTRING` function can be used to search for a substring of a column
```SQL
SELECT * FROM table_name
WHERE SUBSTRING(column_name, start_position, length) = value;
```
e.g.
```SQL
SELECT * FROM table_name
WHERE SUBSTRING(first_name, 1, 4) = `Rich`;
```
will look for every row where the first four letters of the first name are Rich

The `SUBSTRING_INDEX` function will return the substring of a string before specified number of a specified character appears.
```SQL
SELECT SUBSTRING_INDEX(first_name, `a`, 2) FROM table_name
```
will return all characters in first_name that come before the second a. (Note `SUBSTRING_INDEX` is not available in PostgresSQL)
# Multi table SQL
To express relationships between data with a SQL database, we can use multiple tables. In particular we can model **one-to-one**, **one-to-many** and **many-to-many** relationships.

We do this by creating tables with columns that refer to the primary key of other tables, this is known as a **foreign key**. We specify the foreign key column when creating the table.
```SQL
CREATE TABLE table_name
(
  column1 type1,
  column2 type2,
  column3 type3,
  FOREIGN KEY (column3),
  REFERENCES other_table (other_column)
)
```
We have to specify which of the columns is a foreign key, and then specify which table it is referring to and which column in that table. Creating the table in this way will ensure that we can only insert data that contains a foreign key value that actually exists in the table it refers to. With this structure we can model one-to-one and one-to-many relationships.

## Many-to-many relationships
To model a many-to-many relationship we use a so-called **junction table** in addition to the two tables we want to link. The junction table contains foreign keys from the two original tables.


# Joins

## Aliases

Before diving into joins, it is useful to know about aliases. Aliases let us rename the objects and queries we are working with, this makes it less tedious because we will not have to retype long table names all the time.

The `AS` key word can be used to set an alias
```SQL
SELECT column AS col
FROM table_name AS tab
GROUP BY col;
```
However we can also just leave out the `AS` keyword and get the same result (does not work in PostgresSQL?)
```SQL
SELECT column col
FROM table_name tab
GROUP BY col;
```

## Cross Join
A cross join will take every row in one table and merge it with every row in another table, if there are *n* rows in the first table and *m* rows in the second table we end up with *nm* rows after the cross join. A cross join is a type of inner join.
```SQL
SELECT A.columna, B.columnb
FROM table_a AS A
CROSS JOIN
table_b AS B;
```

## Inner join
An inner join will join rows of two tables, where the two rows meet some specified condition.
```SQL
SELECT * FROM table_a AS A
INNER JOIN
table_b AS B
ON condition;
```
For example we can test for equality of a foreign key
```SQL
SELECT * FROM table_a AS A
INNER JOIN
table_b AS B
ON A.b_id = B.id;
```
If the column we want to join on has the same name in table_a and table_b we can use a natural join
```SQL
SELECT * FROM table_a
NATURAL JOIN
table_b;
```

## Outer joins
Inner joins will only return a row in the new table if the two tables being joined both have a row containing a match in the joining condition.

An outer join will return a row whether there is a match or not. If there is no match, the columns from the table being joined will have `NULL` as values. For example, in a left outer join, the columns from the right table would be `NULL` if there was no match.

We can use a `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, and `FULL OUTER JOIN`,
```SQL
SELECT * FROM table_a AS A
LEFT OUTER JOIN
table_b AS B
ON A.b_id = B.id;
```
`LEFT` and `RIGHT` outer joins work as described above. A `FULL OUTER JOIN` will return rows that match, as well as rows from both tables where there was no match, where if the row came from the left table the right columns will be `NULL` and vice-versa.

Note that an outer join will return multiple rows if there are multiple matches.

## Self joins
A self join is where we join a table to itself, typically the table will have a self-referential foreign key. For example, consider a table of people, where for each person, we also keep track of their best friend, who is also a person in the table.
```SQL
SELECT A.name, B.name as friend_name
FROM people AS A
INNER JOIN people as B
ON A.friend_id = B.id;
```

## Unions
Unions let us combine the results of different select statements. A union will return all the entries that are in any of the tables being unioned, without duplicates.
```SQL
SELECT column FROM table_A
UNION
SELECT column FROM table_B
UNION
SELECT column FROM table_c;
```
Note that multiple columns can be in each select statement, but each SELECT being uinioned must have the same number of columns.

If we do want all the values to be returned, including duplicates, we can use the `UNION ALL` command
```SQL
SELECT column FROM table_A
UNION ALL
SELECT column FROM table_B
UNION ALL
SELECT column FROM table_c;
```

## Intersections

## Except

# Sub queries
We can add queries within `()` and use their results in other queries.
```SQL
SELECT * FROM table_a AS A
NATURAL JOIN table_b AS B
WHERE A.col_a IN (SELECT col_b FROM B);
```

## Correlated sub queries

## Advanced filtering with subqueries
The `ALL` command will compare to the maximum value of a sub-query
```SQL
SELECT column FROM table
WHERE column > ALL
(SELECT column FROM table where column > 4);
```
`ANY` will find rows that satsify the condition on any of the rows, e.g.
```SQL
SELECT column FROM table
WHERE column < ANY
(SELECT column FROM table WHERE column > 3);
```

# Joins and sub queries can do the same  thing, when is one the better option?
For example, we can write an `INNER JOIN` as a sub-query
```SQL
SELECT A.col_a, B.col_b
FROM table_a AS A
INNER JOIN table_b AS B
ON A.b_id = B.id;
```
can be written as
```SQL
SELECT A.col_a,
(SELECT col_b FROM table_b
WHERE A.b_id = id)
FROM table_a AS A;
```

# Managing a SQL database when multiple people need access

## Check

## Views
Views can be treated as tables

## Transactions
What do we do if we have multiple queries to do, and we either want all of them to execute, or none of them? For example, checking an account balance, transfering money to another balance, updating the original balance. We can use Transactions for this. Transactions allow us to specify a sequence of SQL commands and either commit to all of them, or have none of them execute.

We first need to use the right storage engine, either InnoDB or BDB. We can alter our table to use the right engine.
```SQL
ALTER TABLE table_a TYPE = InnoDB;
```

We can then use transactions by first typing `START TRANSACTION;` then we type all the SQL statements we want to apply. Afterwards we either type `COMMIT;` to commit the changes or `ROLLBACK;` to revert back to where we started.
```SQL
START TRANSACTION;
SELECT * From table;
UPDATE table SET column = value where column = other_value;
SELECT * FROM table;
ROLLBACK; -- or use COMMIT; here
SELECT * FROM table;
```

## Users
A database can have different user accounts.

The database comes with a root account that can create accounts for all other users. To protect the database a `password` should be set on the root account. How to do this depends on the SQL server software being used.

Next for everyone using the database we can create a separate user account. This too varies per database software.

## Restricting user permissions with GRANT and REVOKE
The `GRANT` command can be used to decide what permissions a user should have and on which databases/tables. For example we can restrict someone to only be able to `SELECT` from a database and not update or delete rows.
```SQL
GRANT SELECT ON
table_name
TO user_name;
```

We can grant multiple permissions at the same time
```SQL
GRANT SELECT,UPDATE ON table_name
TO user_name;
```

If we want that user to also be able to grant other users permissions we can specify `WITH GRANT OPTION`
```SQL
GRANT SELECT ON
table_name
TO user_name
WITH GRANT OPTION;
```

We can also grant for a specific column
```SQL
GRANT SELECT(column) ON table_name TO user_name;
```

We can grant all priviledges using the `GRANT ALL` command
```SQL
GRANT ALL ON table_name
TO user_name;
```
Finally we can grant priviledges on all tables in a database at once using `database_name.*`
```SQL
GRANT ALL ON database_name.*
TO user_name;
```

The `REVOKE` statement is used to remove permissions
```SQL
REVOKE SELECT ON table_name FROM user_name;
```
we can also revoke the grant option
```SQL
REVOKE GRANT OPTION ON
SELECT ON table_name
FROM user_name;
```
Note tha if we revoke a permission from that user and the grant option it is revoked from all users that user granted it to as well. We can make this explicit using the `CASCADE` modifier
```SQL
REVOKE DELETE ON table_name FROM user_name CASCADE;
```
If we want to make sure we do not inadvertently delete somebody elses priviledges we can use the `RESTRICT` modifier, the query will return an error if another user would be affected
```SQL
REVOKE DELETE ON table_name FROM user_name RESTRICT;
```
## Managing multiple users with roles
```SQL
CREATE ROLE role_name;
```
Then we grant priviledges to the role
```SQL
GRANT SELECT, INSERT ON table_name TO role_name;
```

Then we grant the role to a user
```SQL
GRANT role_name TO user_name;
```

To remove a role we `DROP` it
```SQL
DROP ROLE role_name
```

Similarly we can revoke a role
```SQL
REVOKE role_name FROM user_name;
```
or
```SQL
REVOKE role_name FROM user_name CASCADE;
```
Just like the `WITH GRANT OPTION` we can use `WITH ADMIN OPTION` for roles so users can grant that role to other users
```SQL
GRANT role_name TO user_name WITH ADMIN OPTION;
```

## ACID - Atomicity, Consistency, Isolation and Durability

# How are queries parsed

# How does a SQL software driver work?
