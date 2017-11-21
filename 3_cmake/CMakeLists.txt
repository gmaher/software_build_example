PROJECT(hello_world)
cmake_minimum_required(VERSION 3.0)

set (PRINT_PHRASE "we changed the phrase\\n")
configure_file("./lib/hello.cpp.in" "./lib/hello.cpp")
add_library(hello SHARED "./lib/hello.cpp")
include_directories("./lib")
add_executable(hello_world hello_world.cpp)
target_link_libraries(hello_world hello)
