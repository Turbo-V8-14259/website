[![Deploy to Firebase Hosting on PR](https://github.com/Turbo-V8-14259/Website/actions/workflows/firebase-hosting-pull-request.yml/badge.svg)](https://github.com/Turbo-V8-14259/Website/actions/workflows/firebase-hosting-pull-request.yml)
# Turbo V8 website
This is the repository for the Turbo V8 website. The website is hosted on firebase, and the domain is purchased through squarespace. You can access both from the Turbo V8 Google account (ftcturbov8@gmail.com).

## Prerequisites


* [NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
* [Firebase CLI](https://firebase.google.com/docs/cli) (will be installed automatically)

## To edit the website

To edit the website, you need to pull the repository locally. Once it pulls, run `npm install` to install all the required packages. When you finish editing, push the code back to the repository. When you edit the website, make sure to commit and push to the dev branch. When you're happy with your change and ready to update the website, create a new pull request on GitHub to merge to the main branch. This repository is set so that when you push it to GitHub will automatically compile and update the website. In case GitHub doesn't work, you can use `firebase deploy` to update instead.

## Test website locally

You will need to enable web framework compilation by running `firebase experiments:enable webframeworks`. When you're ready, run `npm run dev` to run the website locally. Alternatively, you can use `firebase emulators:start`, although it will be slower.