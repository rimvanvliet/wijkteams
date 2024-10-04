#!/usr/bin/env bash

echo bs-frontend version: ${VERSION}

pushd ${PROJECT_FOLDER}/nginx

docker build \
  --build-arg PLATFORM=${PLATFORM}  \
  -t rimvanvliet/wt-nginx:${VERSION} .

popd