PROJECT(libhello)

add_library(hello SHARED ${CMAKE_CURRENT_LIST_DIR}/hello.cpp)

install(TARGETS hello DESTINATION bin/libhello)
install(FILES ${CMAKE_CURRENT_LIST_DIR}/hello.h DESTINATION bin/libhello)

list(APPEND LIBRARIES hello)
list(APPEND INCLUDE_DIRS ${CMAKE_CURRENT_LIST_DIR})
