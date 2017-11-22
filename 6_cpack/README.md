# Making distributable software with CPack
Once the source code has been compiled and shared libraries have been linked,
the executable parts of the software can be run. We can additionally place
the compiled code on another computer, provided it has the same operating system
and processor architecture and we keep the same paths for shared libraries,
and it will still be runnable.

However users of software are accustomed to be able to install software via
installers/package managers rather than downloading arbitrary binary distributions.

Installing software typically means that the executables and required dependencies/
shared libraries are placed in particular directories where they can be discovered
by the operating system. E.g. `/usr/` for UNIX systems.

As installation procedures depend on the operating system of the user, we would
have to write scripts for every operating system if we did this ourselves. To address
this issue CPack makes it easier to set up installation systems for different
operating systems. CPack will package the installation for us, but we still need
to use CMake commands to install files in the proper location, generate any files
we might need etc.

## Using CPack
CPack can be used standalone or in combination with CMake. Here we focus on
combining CPack with CMake.

The way we build installers with CPack is that we define variables in a CMakeLists.txt
file. we specify the names of the executables we want to install and the folder
name of where to put them. There are many other options such as installer_generator,
icon, license file etc. that can be specified. For a list of generators see
[here](https://cmake.org/Wiki/CMake:CPackPackageGenerators).
