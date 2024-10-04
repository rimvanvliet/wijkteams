#!/usr/bin/env bash

echo wt-wijkteams version: ${VERSION}

docker build \
  --build-arg PLATFORM=${PLATFORM}  \
  -t rimvanvliet/wt-wijkteams:${VERSION} .
