# Turbo V8 website
This is the repository for the Turbo V8 website. The website is hosted on firebase. The domain is purchased through squarespace. You can access both from the Turbo V8 google account (ftcturbov8@gmail.com).

## Prerequisites

* [Firebase CLI](https://firebase.google.com/docs/cli)
* [NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

## To edit the website

To edit the website you need to pull the repository locally. Once it pulls, run `npm install` to install all the required packages. When you finish editing, push the code back to the repository. This repository is set so that when you push it to GitHub will automatically compile and update the website.

## Test website locally

You will need to enable web framework compilation by running `firebase experiments:enable webframeworks`. When you're ready, run `firebase emulators:start` to run the website locally. Alternatively, you can use `npm run dev`.