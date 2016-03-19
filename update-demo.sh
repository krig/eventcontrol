#!/bin/sh
curl --data @eventcontrol.js --output eventcontrol.min.js.$$ 'https://marijnhaverbeke.nl/uglifyjs?utf8=1'
mv eventcontrol.min.js.$$ eventcontrol.min.js
git add eventcontrol.min.js
git commit -m "Updated eventcontrol.min.js"
git checkout gh-pages
git merge -s recursive -X theirs --commit --no-edit master
git checkout master
