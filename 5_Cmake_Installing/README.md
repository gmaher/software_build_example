# Installing files with CMake
Installing an application means placing the binary files and required libraries
for that application in particular locations on the operating system, and
setting things up so that when the executable is run it can find the libraries
it needs.

Operating systems have been set up to allow applications to be installed and detected
in certain locations. For example `/usr/local/bin` is automatically added to the
path on most UNIX systems. Operating systems additionally provide ways for us
to create launcher icons.

## Installing applications with CMake
Normally to make it possible to install our application, we would have to set up
scripts ourselves to place files in the correct locations and ensure the correct
links were set up.

However, CMake provides functionality to take care of this for us. We can call CMake
commands which will add an `install` target to the generated Makefiles that will
let us call `make install` to install our application. We set up the installation
procedure using CMake's `install` command.

## CMake Install command
To install a file with Cmake we call the install command and tell it the type of
file and the destination to install it to using the `DESTINTION` flag.
```cmake
install(TARGETS myExe mySharedLib myStaticLib
        RUNTIME DESTINATION bin
        LIBRARY DESTINATION lib
        ARCHIVE DESTINATION lib/static)
install(TARGETS mySharedLib DESTINATION /some/full/path)
```
we can also install an entire directory
```cmake
install(DIRECTORY src/ DESTINATION include/myproj
        FILES_MATCHING PATTERN "*.h")
```
## Useful install loop
Sometimes we want to install things and preserve a directory:

```cmake
foreach ( file ${INCLUDE_FILES} )
    get_filename_component( dir ${file} DIRECTORY )
    install( FILES ${file} DESTINATION include/${dir} )
endforeach()
```
