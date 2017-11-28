#!/bin/bash

psql --echo-all --set ON_ERROR_STOP=on -c "CREATE ROLE test WITH LOGIN PASSWORD 'test';"

psql --echo-all --set ON_ERROR_STOP=on -c "CREATE DATABASE test_db;"

psql --echo-all --set ON_ERROR_STOP=on -c "GRANT ALL PRIVILEGES ON DATABASE test_db TO test;"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "CREATE TABLE test_table ( \
name varchar(80),\
age int,\
balance real);"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "INSERT INTO \
test_table (name, age, balance) VALUES ('bob', 32, 120.55);"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "SELECT * FROM test_table;"
