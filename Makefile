docker-build:
	docker-compose build

docker-stop:
	docker-compose stop

serve: docker-stop docker-build
	docker-compose run --rm --service-ports web npm start

shell:
	docker-compose run --rm web ash

test: docker-stop docker-build
	docker-compose run --rm web npm test
