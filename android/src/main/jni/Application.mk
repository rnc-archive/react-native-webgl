APP_BUILD_SCRIPT := Android.mk

APP_ABI := armeabi-v7a x86
APP_PLATFORM := android-16

APP_MK_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

NDK_MODULE_PATH:=.$(HOST_DIRSEP)$(THIRD_PARTY_NDK_DIR)

APP_STL := c++_shared
APP_CPPFLAGS := -std=c++11 -fexceptions -pthread

# Make sure every shared lib includes a .note.gnu.build-id header
APP_LDFLAGS := -Wl,--build-id
APP_LDFLAGS += -llog
APP_LDFLAGS += -lGLESv2
APP_LDFLAGS += -pthread
APP_LDFLAGS += -ljnigraphics
