include .env
export

# Dev
dev-wt-wijkteams-build: export VERSION=${WT_DEV_VERSION}
dev-wt-wijkteams-build: export PLATFORM=linux/amd64
dev-wt-wijkteams-build:
	./docker-build.sh

dev-wt-database-build: export VERSION=${WT_DEV_VERSION}
dev-wt-database-build: export PLATFORM=linux/amd64
dev-wt-database-build:
	./database/docker-build.sh

dev-build-all: dev-wt-wijkteams-build dev-wt-database-build

up-all:
	docker compose up -d

down-all:
	docker compose down

# Box
box-wt-wijkteams-build: export VERSION=${WT_BOX_VERSION}
box-wt-wijkteams-build: export PLATFORM=linux/amd64
box-wt-wijkteams-build:
	./docker-build.sh

box-wt-database-build: export VERSION=${WT_BOX_VERSION}
box-wt-database-build: export PLATFORM=linux/amd64
box-wt-database-build:
	./database/docker-build.sh

box-wt-nginx-build: export VERSION=${WT_BOX_VERSION}
box-wt-nginx-build: export PLATFORM=linux/amd64
box-wt-nginx-build:
	./nginx/docker-build.sh

box-build-all: box-wt-wijkteams-build box-wt-database-build box-wt-nginx-build

box-push:
	docker image push rimvanvliet/wt-wijkteams:${WT_BOX_VERSION}
	docker image push rimvanvliet/wt-database:${WT_BOX_VERSION}
	docker image push rimvanvliet/wt-nginx:${WT_BOX_VERSION}

box-deploy2box:
	scp .env box:~/wt
	ssh box 'sudo su -c "cd ~/wt && ~/wt/wt_deploy.sh" - ruud'

box-all: box-build-all box-push box-deploy2box
