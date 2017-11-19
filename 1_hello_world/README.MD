# Hello World example

Here we build the classic c++ hello world example, with an extra twist.
We will use external source code to produce print the hello world phrase.
This is a simple example of how to compile C++ code that uses external code.

## Code Layout

The code layout is:
```
1_hello_world
|-hello_world.cpp
|-lib/
|--hello.cpp
|--hello.h
```

`hello.cpp` is the file that contains the `main()` function of our code.
`lib/hello.cpp` and `lib/hello.h` are files that contain the external code
which we use in the `hello.cpp`.

## Compilation steps
Since `hello.cpp` depends on the code in `/lib` we need to compile the external
code first.

1. Compile the code in `/lib` into an object file so that we can link it to
`hello_world.cpp`

```
cd lib
g++ -c hello.cpp
```
Note that the `-c` flag is telling the compiler to compile to object code, and
hence not to look for a main function (which it normally does).

2. Compile `hello_world.cpp` while telling the compiler to search `/lib` for header
files and linking to `hello.o` (produced in step 1)

```
g++ -I ./lib hello_world.cpp -o hello_world ./lib/hello.o
```

`-I ./lib` is telling the compiler that it should look in `./lib` for header, or
include files

`hello_world.cpp -o hello_world` tells the compiler to compile `hello_world.cpp`
into an executable called `hello_world`

`./lib/hello.o` tells the compiler to look in `hello.o` to find function definitions

## Running the code

If we now run the code we get the familiar
```
./hello_world
Hello world!
```

# Compiling external code as a shared library
The previous approach, compiling external code into an object file and then linking,
compiles the external code into our final binary.
This has the advantage that our binary is independent of the external code after
compiling.
One disadvantage however, is that every time the external code changes,
we need to recompile our binary to include the changes.
To get around this we can compile the external code as a `shared library`,
which the binary knows how to load at run time.

## Compiling a shared library
Compiling a shared library is similar to compiling an object file, except now
we use the `-shared`, `-fPIC` flags.
`-shared` tells the compiler that we are compiling a shared library.
`-fPIC` means that we want the compiled code to be `position independent`. Normally
binary files are a series of bytes/processor instructions that reference particular
memory addresses. If the code we are working with wants to use the shared library
on data in a different address it will then not be able to. Position independent
code makes the memory address relative to a global offset, such that when another
program loads the shared library it can compute the memory addresses it needs to use.

## Shared library compilation steps
1. Compile shared library
```
cd ./lib
g++ -shared -fPIC -o libhello.so hello.cpp
```
This compiles `hello.cpp` into a shared library named `libhello.so`

2. Compile `hello_world.cpp` while linking against `libhello.so`
```
g++ -I./lib -L./lib hello_world.cpp -o hello_world -lhello
```
which is mostly the same as before
`-L./lib` tells the linker to look in `./lib` for shared libraries.
`-lhello` tells the linker to link against `libhello.so`. On unix the linker
expects all shared libraries to be named `lib*.so`, explaining why we need to compile
the shared library as `libhello.so`.

3. Tell the loader where to find the shared library

An additional detail is that when the binary gets loaded into the cpu,
it also needs to know where to find the shared libraries. To do this it looks
in all locations in the `LD_LIBRARY_PATH` variables. So we need to do:
```
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:./lib
```

and now if we run the code it works. An additional benefit to shared libraries
is that we can now distribute the `hello_world` binary and, given some limitations,
if the `libhello.so` file is also on compute that we distributed to the binary can be
run.
