# Professor Website Example

A Jekyll curriculum vitae site for a fictional university professor, "John Doe". All people, institutions, publications and patents in `_data/cv.yml` are made up for demonstration purposes. The site is multilingual (English, Portuguese and Spanish).

## Run locally

With Docker, from the repository root:

```sh
docker run -d --name professor-site -p 4000:4000 \
  -v "$PWD":/site -v professor-site-bundle:/usr/local/bundle -w /site ruby:3.3 \
  bash -c 'printf "exclude: [pages/date-chart.md, pages/giphy.md, pages/video-embed.md, .gitignore, .travis.yml, LICENSE, README.md, CNAME, archive, Gemfile, Gemfile.lock, script, vendor, node_modules, package.json, yarn.lock, docs]\n" > /tmp/local.yml; bundle exec jekyll serve --host 0.0.0.0 --port 4000 --config _config.yml,/tmp/local.yml'
```

Then open <http://localhost:4000/>. Edit `_data/cv.yml` to change the content.

## Credits & license

Based on the CV template by [iROCKBUNNY](https://github.com/iROCKBUNNY/CV) · CC BY-NC-ND 4.0. See [LICENSE](LICENSE).

This example site is maintained by [matbrgz](https://github.com/matbrgz).
