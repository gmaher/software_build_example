PROJECT(CPACK_EXAMPLE)
cmake_minimum_required(VERSION 3.0)

add_executable(main main.cpp)
include(${CMAKE_CURRENT_LIST_DIR}/external/CMakeLists.txt)

foreach(dir ${EXT_INCLUDE_DIRS})
  include_directories(${dir})
endforeach(dir)

foreach(target ${EXT_LIB_TARGETS})
  target_link_libraries(main ${target})
endforeach(target)

set(HOME_DIR $ENV{HOME})
message(${HOME_DIR})

install(DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/external DESTINATION ${HOME_DIR}/cpack_test)
install(PROGRAMS ${CMAKE_BINARY_DIR}/main DESTINATION ${HOME_DIR}/cpack_test/bin)
install(PROGRAMS ${CMAKE_CURRENT_LIST_DIR}/app.sh
        DESTINATION ${HOME_DIR}/cpack_test)

set(CPACK_GENERATOR "DEB")
set(CPACK_DEBIAN_PACKAGE_MAINTAINER "Blah")
include(CPack)
