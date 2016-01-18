#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
node $DIR/../src/query.js $(python $DIR/../src/bing/runtime.py "$@")
