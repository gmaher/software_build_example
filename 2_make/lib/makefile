CC        = g++
CFLAGS    = -Wall

LIB_FLAGS = -fPIC -shared
LIB_NAME  = libhello.so

all: hello_lib

hello_lib:
	${CC} ${CFLAGS} ${LIB_FLAGS} -o ${LIB_NAME} hello.cpp
