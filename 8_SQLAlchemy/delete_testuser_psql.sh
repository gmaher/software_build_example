#!/bin/bash

psql -U test -d test_db --echo-all --set ON_ERROR_STOP=on -c "DELETE FROM test_table"
