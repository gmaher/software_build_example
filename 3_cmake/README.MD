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

#set variable with name VARIABLE_NAME to 1
set (VARIABLE_NAME 1)

#or set variable INCLUDE_DIR to a path
set (INCLUDE_DIR "/path/to/include_files")

#look in a path for header files
#we can also reference a variable's value
include_directories("/home/user/...")
include_directories(${INCLUDE_DIR})

#Build the shared library Hello
add_library(Hello hello.cpp)

#Add an executable to build
add_executable(hello_world hello_world.cpp)

#Link hello_world executable against a library
target_link_libraries(hello_world Hello)

#Look in subdirectory for CMakeLists.txt file and execute it
add_subdirectory('/path/to/subdirectory')
```

## Conditional statements, loops and functions in CMake
CMake lets us use conditional statements to change the way our code is built
depending on certain conditions, for example we can test for the existence
of certain files, what operating system we are on etc.
```cmake
if (CONDITION)
  include_directories('/path/to/library/A')
elseif (CONDITION2)
  include_directories('/path/to/library/B')
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

## Code Generation with CMake

## linking against external libraries
