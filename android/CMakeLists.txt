cmake_minimum_required(VERSION 3.4.1)

# MUST be done before call to 'project'
get_cmake_property(vars CACHE_VARIABLES)
foreach(var ${vars})
  get_property(currentHelpString CACHE "${var}" PROPERTY HELPSTRING)
    if("${currentHelpString}" MATCHES "No help, variable specified on the command line." OR "${currentHelpString}" STREQUAL "")
        # message("${var} = [${${var}}]  --  ${currentHelpString}") # uncomment to see the variables being processed
        list(APPEND CL_ARGS "-D${var}=${${var}}")
    endif()
endforeach()

include(cmake/VcpkgAndroid.cmake)
include(ExternalProject)

Project(cpp)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

SET(TRANSMISSION_LIB_DIR transmission-prefix/src/transmission-build/)

ExternalProject_Add(transmission
  SOURCE_DIR ${CMAKE_SOURCE_DIR}/../cpp/transmission
  INSTALL_COMMAND ""
  CMAKE_ARGS 
    ${CL_ARGS}
    "-DENABLE_DAEMON=OFF" 
    "-DINSTALL_DOC=OFF"
    "-DINSTALL_LIB=OFF"
  BUILD_BYPRODUCTS 
    ${TRANSMISSION_LIB_DIR}/libtransmission/libtransmission.a
    ${TRANSMISSION_LIB_DIR}/third-party/dht.bld/pfx/lib/libdht.a
    ${TRANSMISSION_LIB_DIR}/third-party/jsonsl/libjsonsl.a
    ${TRANSMISSION_LIB_DIR}/third-party/libb64.bld/src/libb64.a
    ${TRANSMISSION_LIB_DIR}/third-party/libdeflate.bld/pfx/lib/libdeflate.a
    ${TRANSMISSION_LIB_DIR}/third-party/libevent.bld/pfx/lib/libevent.a
    ${TRANSMISSION_LIB_DIR}/third-party/libnatpmp.bld/pfx/lib/libnatpmp.a
    ${TRANSMISSION_LIB_DIR}/third-party/libpsl.bld/pfx/lib/libpsl.a
    ${TRANSMISSION_LIB_DIR}/third-party/libutp.bld/libutp.a
    ${TRANSMISSION_LIB_DIR}/third-party/miniupnpc.bld/pfx/lib/libminiupnpc.a
    ${TRANSMISSION_LIB_DIR}/third-party/wildmat/libwildmat.a
)

find_package(CURL REQUIRED)
find_package(OpenSSL REQUIRED)

add_library(libtransmission STATIC IMPORTED)
add_library(libdht STATIC IMPORTED)
add_library(libjsonsl STATIC IMPORTED)
add_library(libb64 STATIC IMPORTED)
add_library(libdeflate STATIC IMPORTED)
add_library(libevent STATIC IMPORTED)
add_library(libnatpmp STATIC IMPORTED)
add_library(libpsl STATIC IMPORTED)
add_library(libutp STATIC IMPORTED)
add_library(libminiupnpc STATIC IMPORTED)
add_library(libwildmat STATIC IMPORTED)
set_target_properties(libtransmission PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/libtransmission/libtransmission.a)
set_target_properties(libdht PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/dht.bld/pfx/lib/libdht.a)
set_target_properties(libjsonsl PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/jsonsl/libjsonsl.a)
set_target_properties(libb64 PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/libb64.bld/src/libb64.a)
set_target_properties(libdeflate PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/libdeflate.bld/pfx/lib/libdeflate.a)
set_target_properties(libevent PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/libevent.bld/pfx/lib/libevent.a)
set_target_properties(libnatpmp PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/libnatpmp.bld/pfx/lib/libnatpmp.a)
set_target_properties(libpsl PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/libpsl.bld/pfx/lib/libpsl.a)
set_target_properties(libutp PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/libutp.bld/libutp.a)
set_target_properties(libminiupnpc PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/miniupnpc.bld/pfx/lib/libminiupnpc.a)
set_target_properties(libwildmat PROPERTIES IMPORTED_LOCATION ${TRANSMISSION_LIB_DIR}/third-party/wildmat/libwildmat.a)

add_library(cpp
SHARED
../cpp/react-native-transmission.cpp
cpp-adapter.cpp
)

target_link_libraries(cpp OpenSSL::Crypto OpenSSL::SSL libtransmission libdht libjsonsl libb64 libdeflate libevent libnatpmp libpsl libutp libminiupnpc libwildmat CURL::libcurl log)

# Specifies a path to native header files.
include_directories(
    ../cpp
    )
    
add_dependencies(cpp transmission)
