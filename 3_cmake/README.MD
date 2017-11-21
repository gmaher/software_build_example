# CMake example

Cmake is a program that helps with building and distributing software.
It is similar to the Make program, in that CMake also looks for a specific
file with commands to build software. In particular, CMake looks for a
`CMakeLists.txt` file in each directory with software to build.

CMakeLists.txt files contain variables to be used when building, tell CMake in
which directories to look for include and library files, can output messages,
and contain other useful build commands.

On UNIX systems, CMake uses the CMakeLists.txt file to generate a MakeFile with
which our software can be built.

## How to use CMake

To use CMake we need to make a CMakeLists.txt file with the required CMake
commands. We can then run CMake by pointing it to the correct directory:
```
cmake /path/to/directory/with/CMakeListsFile -DCMakeOption=Value -D...
```
Note that we can also specify CMake options using `-D` followed by the option name,
an equals sign and the option value.

## Creating CMakeLists.txt files
CMake exposes specific syntax to use when creating CMakeLists.txt files, here are
some common commands:
```cmake
#set minimum cmake version required
cmake_minimum_required (VERSION 3.5)

#Set project name
project (HelloProject)

#set variable with name VARIABLE_NAME to 1
set (VARIABLE_NAME 1)

#or set variable INCLUDE_DIR to a path
set (INCLUDE_DIR "/path/to/include_files")

#look in a path for header files
#we can also reference a variable"s value
include_directories("/home/user/...")
include_directories(${INCLUDE_DIR})

#define an option (shows up in the CMake GUI so users can change it, or via -D)
option (option_name "this is the option description" ON)

#Build the library Hello, static by default
add_library(Hello hello.cpp)
#or shared
add_library(Hello SHARED hello.cpp)

#Add an executable to build
add_executable(hello_world hello_world.cpp)

#Link hello_world executable against a library
target_link_libraries(hello_world Hello)

#Look in subdirectory for CMakeLists.txt file and execute it
add_subdirectory("/path/to/subdirectory")
```

## Conditional statements, loops and functions in CMake
CMake lets us use conditional statements to change the way our code is built
depending on certain conditions, for example we can test for the existence
of certain files, what operating system we are on etc.
```cmake
if (CONDITION)
  include_directories("/path/to/library/A")
elseif (CONDITION2)
  include_directories("/path/to/library/B")
else (CONDITION3)
  #do some other stuff
endif(CONDITION)
```

See the [cmake if docs](https://cmake.org/cmake/help/v3.10/command/if.html#command:if)
for more information on what you can do with if statements.

We can also use loops, for example, to build a list of libraries
```cmake
foreach(loop_var ${LIBRARIES})
  add_subdirectory(${loop_var})
  target_link_libraries(exe_name ${loop_var})
endforeach(loop_var)
```

It is also possible to use functions to group together commands
```cmake
function(func_name var1 var2)
  message("variable 1 = ${var1}, variable 2 = ${var2}")
  include_directories(${var1}/include)
  add_subdirectory(${var2}/lib)
  target_link_libraries(${var2})
endfunction(func_name)
```

## Passing CMake Options to Source Code
We may wish to change our source code depending on the conditions passed to CMake,
for example using different code depending on operating system etc. This can be done
using CMake's `configure_file` command. configure_file copies the input file to
another location and modifies text between `@` symbols. It is common practice
to add `.in` after the file extension for files that will be modified by CMake.

An example:
```cmake
#CMakeLists.txt
PROJECT(hello_world)
cmake_minimum_required(VERSION 3.0)

set (PRINT_PHRASE "we changed the phrase\\n")
configure_file("./lib/hello.cpp.in" "./lib/hello.cpp")
add_library(hello SHARED "./lib/hello.cpp")
include_directories("./lib")
add_executable(hello_world hello_world.cpp)
target_link_libraries(hello_world hello)
```
```C++
//./lib/hello.cpp.in
#include <iostream>

void say_hello(){
  std::cout << "@PRINT_PHRASE@";
}
```
```C++
//./lib/hello.h
void say_hello();
```
```C++
#include "hello.h"

int main(){
  say_hello();
  return 0;
}
```

Running `cmake .` in the current directory we get the output
```
-- The C compiler identification is GNU 5.4.0
-- The CXX compiler identification is GNU 5.4.0
-- Check for working C compiler: /usr/bin/cc
-- Check for working C compiler: /usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: /usr/bin/c++
-- Check for working CXX compiler: /usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/marsdenlab/projects/software_build_example/3_cmake
```
and the file `./lib/hello.cpp` will have also been generated:
```C++
//./lib/hello.cpp
#include <iostream>

void say_hello(){
  std::cout << "we changed the phrase\n";
}
```
## linking against external libraries
