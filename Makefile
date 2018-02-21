#
# basic project construction steps
#
# be aware to not use make directly. instead, call npm so it will call the correct make for you
#

clean:
	echo `which make`
	rm -rf dist/css
	rm -rf dist/img
	rm -rf dist/index.html
	rm -rf dist/build.js

build: clean
	cross-env NODE_ENV=production browserify src/main.js -o dist/build.js
	cp -R css dist/css
	cp -R img dist/img
	cp index.html dist/index.html

dev:
	cross-env NODE_ENV=development budo src/main.js:build.js -o -l --wg '^dist,^node_modules,**/*.{html,css,js,vue}'

test:
	cross-env NODE_ENV=testing nyc mocha --timeout=20000 --exit
 
release: build
	# TODO adicionar configuração para publicação no google firebase
