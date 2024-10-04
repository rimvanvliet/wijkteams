#!/bin/bash

printf "Starting deploy\n"
docker compose down
printf "\nPull new images\n"
docker-compose pull
printf "\nRestarting\n"
docker-compose up -d
docker logs -f wt-wijkteams
