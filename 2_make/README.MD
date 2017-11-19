# Using the make build tool

In `1_hello_world` we saw how to build C++ code and C++ shared
libraries using the compiler directly.
This process becomes cumbersome if we have many files and libraries to compile.
The `make` tool is a tool that was developed to help automate building software

## How does make work?

Make is a program that reads files called `makefiles` to learn how to build your
code. Makefiles specify a sequence of targets, the files/targets they depend on
and the commands that need to be executed to build them. The general syntax
for specifiying targets in makefiles is:
```
target_name: dependencies
  build command
```
Note that a `tab` must precede the `build command` line.

A concrete example would be:
```
main: hello
  g++ -I./lib hello_world.cpp -o hello ./lib/hello.o
```
which specifies a target named `main` that depends on a target named `hello` and
build the `hello_world.cpp` file.

## Make hello world

We will now use the make tool to build our earlier hello_world example.
To do this, we have to create a makefile that specifies how to build `hello_world.cpp`
and the shared library, which looks like this:
```make
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
```
