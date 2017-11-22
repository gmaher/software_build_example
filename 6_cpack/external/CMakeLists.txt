project(EXTERNAL)
cmake_minimum_required(VERSION 3.0)
set(EXT_DIR ${CMAKE_CURRENT_LIST_DIR})

set(EXT_INCLUDE_DIRS "")
set(EXT_LIB_TARGETS "")
include(${EXT_DIR}/lib_A/CMakeLists.txt)
include(${EXT_DIR}/lib_B/CMakeLists.txt)
