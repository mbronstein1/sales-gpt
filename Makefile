# Run prisma migration
run-migrate:
	docker exec -it sales-gpt npx prisma migrate dev

create-migrate-file:
	docker exec -it sales-gpt npx prisma migrate dev --create-only

upgrade-migrate:
	docker exec -it sales-gpt npx prisma migrate deploy

check-migrate-status:
	docker exec -it sales-gpt npx prisma migrate status

run-dev-build:
	docker compose up --build

run-dev:
	docker compose up

stop-dev:
	docker compose down

run-prod-build:
	docker compose -f docker-compose.prod.yml up --build

run-prod:
	docker compose -f docker-compose.prod.yml up

stop-prod:
	docker compose -f docker-compose.prod.yml down

init-db:
	docker exec -it sales-gpt npx ts-node ./src/util/init.util.ts
	@echo "Database initialized"