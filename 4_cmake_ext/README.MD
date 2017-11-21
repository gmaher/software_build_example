# Building and linking external libraries with CMake

There are a couple of ways of using external libraries with cmake.
Sometiems we have an external library we wish to build and then link against.
Alternatively we may have an already built external library we want to link against.
Finally we may want to retrieve the source code of an external library from
somewhere, then build it and link against it.

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
