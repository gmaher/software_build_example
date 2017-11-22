# Building and linking external libraries with CMake

There are a couple of ways of using external libraries with cmake.
Sometiems we have an external library we wish to build and then link against.
Alternatively we may have an already built external library we want to link against.
Finally we may want to retrieve the source code of an external library from
somewhere, then build it and link against it.

## Building an external library and linking against it
If the external library we are trying to build and link against has a CMakeLists.txt
file, it is very easy to build it simultaneously with our main files.

CMake offers the command `add_subdirectory` with which can specify a path,
containing a CMakeLists.txt file, that CMake will then enter into and execute
the found CMakeLists.txt file.

The `add_subdirectory` command creates a new scope which the parent scope
does not have access to, however the new scope will inherit all variables
from the parent scope.

If we wish to access variables from the schild scope we can use
```cmake
set(VAR_NAME VAR_VALUE PARENT_SCOPE)
```
or we can use CMake's `configure_file` and `find_package` commands, which we
explain next.

## Finding an installed package

Many libraries come pre-installed with our operating system, or are installed
in predictable locations. CMake is preconfigured to already be able to find
many of these packages. CMake does this with the `find_package` command.
The find_package command searches for a `Find<package>.cmake` in any of the
directories specified in the `CMAKE_MODULE_PATH` variable. In particular,
CMake constructs a prefix and searches the following paths:
```
<prefix>/                                               (W)
<prefix>/(cmake|CMake)/                                 (W)
<prefix>/<name>*/                                       (W)
<prefix>/<name>*/(cmake|CMake)/                         (W)
<prefix>/(lib/<arch>|lib|share)/cmake/<name>*/          (U)
<prefix>/(lib/<arch>|lib|share)/<name>*/                (U)
<prefix>/(lib/<arch>|lib|share)/<name>*/(cmake|CMake)/  (U)

<prefix>/<name>.framework/Resources/                    (A)
<prefix>/<name>.framework/Resources/CMake/              (A)
<prefix>/<name>.framework/Versions/*/Resources/         (A)
<prefix>/<name>.framework/Versions/*/Resources/CMake/   (A)
<prefix>/<name>.app/Contents/Resources/                 (A)
<prefix>/<name>.app/Contents/Resources/CMake/           (A)
```
where (U),(W) and (A) stand for UNIX, Windows and Apple respectively.
On Ubuntu the prefix is usually `/usr` and/or `/usr/local`.

The find_package command creates a variable named `<package>_DIR`, that will
be autofilled to the found directory, if it is discovered, or will otherwise
need to be specified when running CMake (via command line or the CMakeLists.txt file).

## Finding a package in a different location

Sometimes the package we want to link is not installed, e.g. because we just built
it in a subdirectory. In this case there will not be a Find<package>.cmake file
in the CMAKE_MODULE_PATH, and so the external packages CMakeLists.txt file will
have to provide instructions to create the required `.cmake` files when building.
This can be done using a `.cmake.in` file and CMakes `configure_file` command.
The `.cmake` file should export the names and locations of all header files and
libraries that other programs will need to link against to use the external library.

## ExternalProject_ADD Function
Sometimes we wish to allow our build process to download dependencies and build
those as well (known as a SuperBuild). This can be done using CMake's ExternalProject_ADD
command.

The ExternalProject_ADD command lets us specify instructions for downloading,
configuring and building an external project. An example of the syntax is (taken from
  [here](https://github.com/Sarcasm/cmake-superbuild))
```cmake
ExternalProject_Add (ep_boost
  URL http://sourceforge.net/projects/boost/files/boost/1.55.0/boost_1_55_0.tar.bz2/download
  URL_MD5 d6eef4b4cacb2183f2bf265a5a03a354
  CONFIGURE_COMMAND ./bootstrap.sh --with-libraries=atomic,date_time,filesystem,program_options,system,thread
  BUILD_COMMAND ./b2 link=static
  BUILD_IN_SOURCE 1
  INSTALL_COMMAND ""
)
```
## Example: building and finding a local library

We have a file `main.cpp` that uses code from `./local_lib/local_lib.cpp`. We want
to set up the build process for `main.cpp` to also build `local_lib` and properly
include its header files and link against its shared libraries.

In our main CMakeLists.txt file we use the `add_subdirectory` comman:
```cmake
PROJECT("CMAKE_EXT")
cmake_minimum_required(VERSION 3.0)

message("Building main library, directory is: ${CMAKE_SOURCE_DIR}")
add_executable(main main.cpp)

add_subdirectory("${CMAKE_SOURCE_DIR}/local_lib")
message("TEST_VAR=${TEST_VAR}")
#Lets try to find the package
list(APPEND CMAKE_PREFIX_PATH "${CMAKE_SOURCE_DIR}/local_lib")

find_package(local_lib REQUIRED)

include_directories(${local_lib_INCLUDE})
target_link_libraries(main ${local_lib_TARGET})
```
Note that we reference the variables `local_lib`, `local_lib_TARGET`,
`local_lib_INCLUDE` without declaring them. This is because they are exported
when building `local_lib` into its `local_lib-config.cmake` file and then found
by the call to `find_package(local_lib REQUIRED)`.

The CMakeLists.txt in `./local_lib` is then set up to configure a `local_lib-config.cmake`
file to export the required variables:
```cmake
PROJECT("local_lib")
cmake_minimum_required(VERSION 3.0)
set(TEST_VAR "test to see if we can access TEST_VAR")
message("building local lib, directory is: ${CMAKE_CURRENT_SOURCE_DIR}")

set(local_lib_DIR ${CMAKE_CURRENT_SOURCE_DIR})
set(local_lib_INCLUDE ${CMAKE_CURRENT_SOURCE_DIR}/include)
set(local_lib_LIBRARY ${CMAKE_CURRENT_SOURCE_DIR}/lib)

set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${local_lib_LIBRARY})
add_library(local_lib SHARED ${local_lib_DIR}/local_lib.cpp)
set(local_lib_TARGET local_lib)

configure_file(${local_lib_DIR}/local_lib-config.cmake.in
                ${local_lib_DIR}/local_lib-config.cmake)

```
Note that we change `CMAKE_LIBRARY_OUTPUT_DIRECTORY` to make sure libraries
from local_lib get built into the correct directory.

We use the file `local_lib-config.cmake.in` to generate the config file using
CMake's `@@` notation:
```cmake
set(local_lib_DIR @local_lib_DIR@})
set(local_lib_INCLUDE @local_lib_INCLUDE@)
set(local_lib_LIBRARY @local_lib_LIBRARY@)
set(local_lib_TARGET @local_lib_TARGET@)
```

## Example: ExternalProject_ADD to download and build an external project
This is similar to the previous example, except now we have a subdirectory with
a CMakeLists.txt file that invokes the ExternalProject_ADD command.
```cmake
include (ExternalProject)

#set prefix so project is downloaded to right directory
set(EP_PREFIX ${CMAKE_CURRENT_SOURCE_DIR})

ExternalProject_ADD(ITK
DOWNLOAD_COMMAND git clone https://github.com/InsightSoftwareConsortium/ITK.git)
```
using the `add_subdirectory` command will then download ITK and, since ITK has a
CMakeLists.txt file, cmake will then proceed to build it.

## CMake Export command

Export targets from the build tree for use by outside projects.

```CMake
export(EXPORT <export-name> [NAMESPACE <namespace>] [FILE <filename>])
```

Create a file <filename> that may be included by outside projects to import targets from the current project’s build tree. This is useful during cross-compiling to build utility executables that can run on the host platform in one project and then import them into another project being compiled for the target platform. If the NAMESPACE option is given the <namespace> string will be prepended to all target names written to the file.
