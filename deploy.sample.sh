#!/bin/bash
# https://nuxtjs.org/faq/deployment-aws-s3-cloudfront/

export AWS_ACCESS_KEY_ID="key"
export AWS_SECRET_ACCESS_KEY="secret"
export AWS_BUCKET_NAME="bucket"
export AWS_CLOUDFRONT="UPPERCASE"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run generate
gulp deploy