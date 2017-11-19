#macros for main cpp file
CC     	    = g++
CFLAGS 	    = -Wall
INCLUDE_DIR = ./lib

#macros for our shared library
LIB_DIR    =./lib
LIB_FLAGS  =-fPIC -shared
LIB_NAME   =hello

#targets and dependencies
all: hello_world

hello_world: hello_lib
	$(CC) ${CFLAGS} -I${INCLUDE_DIR} -L${LIB_DIR} hello_world.cpp -o hello -l${LIB_NAME}

hello_lib:
	${CC} ${CFLAGS} ${LIB_FLAGS} -o ${LIB_DIR}/lib${LIB_NAME}.so ${LIB_DIR}/hello.cpp
