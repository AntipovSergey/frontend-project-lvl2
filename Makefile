install:
	npm ci
	
publish:
	npm publish --dry-run
	
lint:
	npx eslint . 
	
reference:
	node bin/gendiff.js -h
