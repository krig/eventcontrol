#!/bin/sh
# service discontinued
#curl -X POST -s --data-urlencode "js_code=$(cat eventcontrol.js)" --output eventcontrol.min.js.$$ 'http://marijnhaverbeke.nl/uglifyjs?utf8=1&download=eventcontrol.min.js'
if which uglifyjs >/dev/null 2>&1; then
	uglifyjs -o eventcontrol.min.js eventcontrol.js
	git add eventcontrol.min.js
	git commit -m "Updated eventcontrol.min.js"
else
	echo "Install uglifyjs (npm install -g uglify-js)"
	exit 1
fi
git checkout gh-pages
git merge -s recursive -X theirs --commit --no-edit master
git checkout master
