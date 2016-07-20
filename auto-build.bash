#!/bin/bash

# autobuild analog for build.bash. Useful for instant build of documentation
# as the files are changed. Also does a browser refresh once the build is done.

# requirements
command -v sphinx-build >/dev/null 2>&1 || { echo >&2 "Please install Sphinx http://sphinx-doc.org/install.html"; exit 1; }
command -v sphinx-autobuild >/dev/null 2>&1 || { echo >&2 "Please install Sphinx autobuild. pip install sphinx-autobuild"; exit 1; }

cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -d "build" ]; then
    rm -r build/
fi

# TODO: make port configurable
sphinx-autobuild -p 3002 . build
