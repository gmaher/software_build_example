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
