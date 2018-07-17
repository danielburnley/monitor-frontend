docker-build:
	docker-compose build

docker-stop:
	docker-compose stop

serve: docker-stop docker-build
	docker-compose run --rm --service-ports web npm start

test: docker-stop docker-build
	docker-compose run --rm web npm test
