init: docker-up install init-db


watch: docker-up serve

docker-up:
	@dc up -d

docker-down:
	@dc down

install: composer.lock yarn.lock
	composer install
	yarn install

serve:
	@yarn run dev-server || true

init-db: drop-db
	bin/console doctrine:migrations:migrate -n
	bin/console doctrine:fixtures:load --no-interaction

drop-db:
	bin/console doctrine:schema:drop --force
	bin/console doctrine:query:sql "DROP TABLE IF EXISTS migration_versions"

generate-jwt-configuration:
	openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
	openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout

.PHONY: init watch docker-up docker-down init-db drop-db
