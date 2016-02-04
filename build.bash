#!/bin/bash

# requirements
command -v sphinx-build >/dev/null 2>&1 || { echo >&2 "Please install Sphinx http://sphinx-doc.org/install.html"; exit 1; }

cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -d "build" ]; then
    rm -r build/
fi

sphinx-build . build/
