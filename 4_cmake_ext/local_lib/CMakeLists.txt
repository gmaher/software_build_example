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
