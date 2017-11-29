#!/bin/bash

psql --echo-all --set ON_ERROR_STOP=on -c "CREATE ROLE test WITH LOGIN PASSWORD 'test';"

psql --echo-all --set ON_ERROR_STOP=on -c "CREATE DATABASE test_db;"

psql --echo-all --set ON_ERROR_STOP=on -c "GRANT ALL PRIVILEGES ON DATABASE test_db TO test;"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "CREATE TABLE test_table ( \
name varchar(80) primary key,\
age int,\
balance real);"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "CREATE TABLE categories ( \
id int primary key,\
category varchar(80),\
testobject_name varchar(80) references test_table(name));"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "INSERT INTO \
test_table (name, age, balance) VALUES ('bob', 32, 120.55);"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "INSERT INTO \
test_table (name, age, balance) VALUES ('alex', 20, 10.12);"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "INSERT INTO \
categories (id, category, testobject_name) VALUES (1, 'male', 'bob');"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "INSERT INTO \
categories (id, category, testobject_name) VALUES (2, 'female', 'alex');"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "SELECT * FROM test_table;"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "SELECT * FROM categories;"
