Documentation
=============

#Guide for documentation
We use `jsdoc` and publish to the `gh-pages` for the git repo.

To make life a bit easier we mount the `gh-pages` branch as a submodule in the
folder `docs`


##Add the `gh-pages` as the `docs` folder
```bash
$ git checkout master
$ git submodule add -b gh-pages git@github.com:foo/bar.git docs
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD &lt;file&gt;..." to unstage)
#
#    new file:   .gitmodules
#    new file:   docs
#
$ git commit -m "added gh-pages as submodule"
$ git push
```

Init the submodule
```bash
$ git submodule init
Submodule 'docs' (git@github.com:foo/bar.git) registered for path 'docs'
$ git submodule 
 509dbc55199d7efb6fbb4180bc898a0c5b6830de docs (heads/gh-pages)
```

##Install jsdoc
```bash
$ npm install jsdoc -g
```

##Run jsdoc to update documentation
```js
$ jsdoc . -d docs
$ cd docs
$ git add -A
$ git commit -am 'updated documentation'
$ git push
```