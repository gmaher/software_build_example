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
LIB_DIR     = ./lib
LIB_FLAGS   = -fPIC -shared
LIB_NAME    = hello

#targets and dependencies
all: hello_world

hello_world: hello_lib
	${CC} ${CFLAGS} -I${INCLUDE_DIR} -L${LIB_DIR} hello_world.cpp -o hello -l${LIB_NAME}

hello_lib:
	${CC} ${CFLAGS} ${LIB_FLAGS} -o ${LIB_DIR}/lib${LIB_NAME}.so ${LIB_DIR}/hello.cpp
```

To make our makefile general, we specify `macros` at the top. Macros let us use variables
in our makefile, here used to specify things like compiler flags, shared library
directory and shared library names.

We then define the target `all` which depends on the target `hello_world`. If called
with no arguments, make builds the first target in the makefile, which in this case
is all, which causes the target `hello_world` to be built.

The target hello_world depends on the `hello_lib` target and specifies how to build
`hello_world.cpp`, while referencing some of the defined macros using `${MACRO_NAME}`
notation.

Since the hello_world target depends on hello_lib, hello_lib will be built before
hello_world. The hello_lib target specifies how to build the `libhello.so` shared
library from before.

If we now run `make` in the terminal we get
```
g++ -Wall -fPIC -shared -o ./lib/libhello.so ./lib/hello.cpp
g++ -Wall -I./lib -L./lib hello_world.cpp -o hello -lhello
```
as output.

If we now execute `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:./lib && ./hello` we
get
```
Hello world!
```
as output, showing our code built successfully.

## Using recursive makefiles
It can be cumbersome to have to specify all build commands in one file. To get
around this we can give our shared library its own makefile, and call this makefile
from the main makefile.

We now create a makefile in the `./lib` directory,
```make
CC        = g++
CFLAGS    = -Wall

LIB_FLAGS = -fPIC -shared
LIB_NAME  = libhello.so

all: hello_lib

hello_lib:
	${CC} ${CFLAGS} ${LIB_FLAGS} -o ${LIB_NAME} hello.cpp
```
which simply builds the shared library as before.

Then in the top level directory we create `makefile2` which specifies how to
build `hello_world.cpp`
```make
#macros for main cpp file
CC     	    = g++
CFLAGS 	    = -Wall
INCLUDE_DIR = ./lib

#macros for our shared library
LIB_DIR    =./lib
LIB_NAME   =hello

#.PHONY specifies this target is not a file
.PHONY: hello_lib

#targets and dependencies
all: hello_world

hello_world: hello_lib
	$(CC) ${CFLAGS} -I${INCLUDE_DIR} -L${LIB_DIR} hello_world.cpp -o hello -l${LIB_NAME}

hello_lib:
	(cd ${LIB_DIR} && make)
```

We have replace the `hello_lib` target with a command that tells make to open
a new shell and to `cd` to the library directory and call make there. Since the
`hello_lib` target no longer references a file, we need to add the `.PHONY` modifier
near the top of the makefile to tell make this.

If we now call make from the top directory we get the output
```
(cd ./lib && make)
make[1]: Entering directory '/home/marsdenlab/projects/software_build_example/2_make/lib'
g++ -Wall -fPIC -shared -o libhello.so hello.cpp
make[1]: Leaving directory '/home/marsdenlab/projects/software_build_example/2_make/lib'
g++ -Wall -I./lib -L./lib hello_world.cpp -o hello -lhello
```

If we now execute `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:./lib && ./hello` we
get
```
Hello world!
```
as output, showing our code built successfully.
