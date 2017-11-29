#!/bin/bash

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "DELETE FROM test_table"

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "DELETE FROM test_table"

psql --echo-all --set ON_ERROR_STOP=on -c "DROP DATABASE test_db"

psql --echo-all --set ON_ERROR_STOP=on -c "DROP USER test"
