# Turbo V8 website
This is the repository for the Turbo V8 website. The website is hosted on firebase. The domain is purchased through squarespace. You can access both from the Turbo V8 google account (ftcturbov8@gmail.com).

## To edit the website

To edit the website you need to pull the repository locally. When you finish editing, push the code back to the repository. This repository is set so that when you push it to GitHub will automatically compile and update the website.

## Test website locally

To test the website locally, you need to install firebase cli, [Instructions here](https://firebase.google.com/docs/cli). Then you will need to enable web framework compilation by running `firebase experiments:enable webframeworks`. When you're ready, run `npm run dev` to run the website locally.