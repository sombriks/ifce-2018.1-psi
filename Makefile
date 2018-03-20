#
# basic project construction steps
#
# please do not use make directly. instead, call npm run <script>, so it will 
# call the correct make for you
#
# also just give up windows. it doesn't work well enve if you try wsl or git 
# bash or even cygwin
#

clean:
	rm -rf dist/public/css
	rm -rf dist/public/img
	rm -rf dist/public/index.html
	rm -rf dist/public/build.js

build: clean
	cross-env NODE_ENV=production browserify src/main.js -o dist/public/build.js
	cp -R css dist/public/css
	cp -R img dist/public/img
	cp index.html dist/public/index.html

dev:
	cross-env NODE_ENV=development budo src/main.js:build.js -o -l -H 127.0.0.1 --wg '^dist,^node_modules,**/*.{html,css,js,vue}'

test:
	cross-env NODE_ENV=testing nyc mocha --timeout=20000 --exit
 
release: build
	cd dist ; firebase deploy
