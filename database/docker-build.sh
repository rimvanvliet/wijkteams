#!/usr/bin/env bash

echo version: ${VERSION}
echo platform: ${PLATFORM}

pushd database

docker build \
     --build-arg PLATFORM=${PLATFORM}  \
     -t rimvanvliet/wt-database:${VERSION} .

popd