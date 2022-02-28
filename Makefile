install:
	npm ci
	
publish:
	npm publish --dry-run
	
lint:
	npx eslint . 
	
reference:
	gendiff -h
