#!/bin/bash
# https://nuxtjs.org/faq/deployment-aws-s3-cloudfront/

# make file executable
set -e

export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""

instructions ()
{
  echo "*********************************************"
  echo "Run this script as an npm task              *"
  echo "$ npm run deploy <env>                      *"
  echo "env: eg. dev, qa, uat                       *"
  echo "for example: $ npm run deploy dev           *"
  echo "*********************************************"
}

if [ $# -eq 0 ]; then
  instructions
  exit 1
elif [ "$1" == dev ]; then
  export AWS_BUCKET_NAME=""
  export AWS_CLOUDFRONT=""
elif [ "$1" == qa ]; then
  export AWS_BUCKET_NAME=""
  export AWS_CLOUDFRONT=""
elif [ "$1" == uat ]; then
  export AWS_BUCKET_NAME=""
  export AWS_CLOUDFRONT=""
else
  instructions
  exit 1
fi

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run build
gulp deploy
