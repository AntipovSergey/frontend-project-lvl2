install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

reference:
	gendiff -h

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

.PHONY: test