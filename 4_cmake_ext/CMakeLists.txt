PROJECT("CMAKE_EXT")
cmake_minimum_required(VERSION 3.0)

message("Building main library, directory is: ${CMAKE_SOURCE_DIR}")
add_executable(main main.cpp)

add_subdirectory("${CMAKE_SOURCE_DIR}/local_lib")

#Lets try to find the package
list(APPEND CMAKE_PREFIX_PATH "${CMAKE_SOURCE_DIR}/local_lib")

find_package(local_lib REQUIRED)

include_directories(${local_lib_INCLUDE})
target_link_libraries(main ${local_lib_TARGET})

#let's download the online library too
add_subdirectory(${CMAKE_SOURCE_DIR}/online_lib)
