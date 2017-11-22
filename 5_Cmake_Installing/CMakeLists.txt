PROJECT(HELLO_WORLD)
cmake_minimum_required(VERSION 3.0)

set(CMAKE_INSTALL_PREFIX /usr)

list(APPEND LIBRARIES "")
list(APPEND INCLUDE_DIRS "")

include(hello_lib/CMakeLists.txt)

add_executable(hello_world hello_world.cpp)

foreach(dir ${INCLUDE_DIRS})
  include_directories(${dir})
endforeach(dir)

foreach(lib ${LIBRARIES})
  target_link_libraries(hello_world ${lib})
endforeach(lib)

configure_file(hello_world.sh.in hello_world.sh)
install(TARGETS hello_world DESTINATION bin/libhello)
install(FILES hello_world.sh
DESTINATION bin
PERMISSIONS OWNER_EXECUTE GROUP_EXECUTE WORLD_EXECUTE)
