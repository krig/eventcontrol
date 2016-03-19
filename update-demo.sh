#!/bin/sh
curl -X POST -s --data-urlencode "js_code=$(cat eventcontrol.js)" --output eventcontrol.min.js.$$ 'http://marijnhaverbeke.nl/uglifyjs?utf8=1&download=eventcontrol.min.js'
mv eventcontrol.min.js.$$ eventcontrol.min.js
git add eventcontrol.min.js
git commit -m "Updated eventcontrol.min.js"
git checkout gh-pages
git merge -s recursive -X theirs --commit --no-edit master
git checkout master
