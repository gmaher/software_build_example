PROJECT(hello_world)
cmake_minimum_required(VERSION 3.0)

find_package(VTK PATHS "/media/gabriel/Data/projects/SV/production/build/Externals-build/sv_externals/bin/gnu/5.4/x64"
  NO_DEFAULT_PATH)
add_executable(main main.cpp)

foreach(d ${VTK_INCLUDE_DIRS})
  message(${d})
endforeach()

foreach(d ${VTK_LIBRARIES})
  message(${d})
endforeach()

include_directories(${VTK_INCLUDE_DIRS})
#target_link_libraries(${VTK_LIBRARIES})
