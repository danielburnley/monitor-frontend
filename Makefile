.PHONY: docker-build
docker-build:
	docker-compose build

.PHONY: docker-down
docker-down:
	docker-compose down

.PHONY: serve
serve: docker-down docker-build
	docker-compose up

.PHONY: shell
shell:
	docker-compose run --rm web ash

.PHONY: storybook
storybook: 
	docker-compose run --rm --service-ports web npm run storybook

.PHONY: test
test: docker-down docker-build
	docker-compose run --rm web npm test
