cp CNAME dist/
git add --all
git commit -m "$1"
git push origin master
git subtree push --prefix dist origin gh-pages
