docker-build:
	docker-compose build

docker-stop:
	docker-compose stop

serve: docker-stop docker-build
	docker-compose up

shell:
	docker-compose run --rm web ash

storybook: 
	docker-compose run --rm --service-ports web npm run storybook

test: docker-stop docker-build
	docker-compose run --rm web npm test
