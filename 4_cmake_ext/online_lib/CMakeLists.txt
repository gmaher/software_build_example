include (ExternalProject)

#set prefix so project is downloaded to right directory
set(EP_PREFIX ${CMAKE_CURRENT_SOURCE_DIR})

ExternalProject_ADD(ITK
DOWNLOAD_COMMAND git clone https://github.com/InsightSoftwareConsortium/ITK.git)
