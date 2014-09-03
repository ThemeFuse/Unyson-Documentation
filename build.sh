#!/bin/bash

#CURRENT_DIR=$(dirname "$(readlink -fn "$0")")
#cd "$CURRENT_DIR"

if [ -d "build" ]; then
    rm -r build/
fi

sphinx-build . build/
