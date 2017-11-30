.PHONY: serve s deploy help 
.DEFAULT_GOAL := help

include .env

serve: ## Build everything and run website on localhost:8080
	yarn run serve

s: serve

latest: ## Build latest codevember and run website on localhost:8080
	yarn run latest

l: latest

deploy: ## Deploy ./dist folder on the server
	@echo "Deploy website"
	@yarn run build
	@rsync -avz ./dist/ $(USER)@$(SERVER):$(SERVER_DEST)
	@rsync index.html $(USER)@$(SERVER):$(SERVER_DEST)

help: ## This help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'