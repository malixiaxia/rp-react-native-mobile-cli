#!/bin/bash

set -e
node -v
npm cache clean --force
echo "--- install dependencies ---"
npm install
echo "\n"
echo "--- clean target folder... ---"
rm -rf target

echo "\n"
echo "--- start to build... ---"
echo "--- mkdir folder ... ---"
mkdir -p target/debug/ruubypay-reactnative-yitongxing/pages/
mkdir -p target/test/ruubypay-reactnative-yitongxing/pages/
mkdir -p target/release/ruubypay-reactnative-yitongxing/pages/

echo "--- build ios file ... ---"
#npm run build:ios:remind:debug
#npm run build:ios:mine:debug
#npm run build:ios:service:debug
#npm run build:ios:business:debug
#npm run build:ios:hotActivity:debug


npm run build:ios:remind:test
npm run build:ios:mine:test
npm run build:ios:service:test
npm run build:ios:business:test
npm run build:ios:hotActivity:test

npm run build:ios:remind:release
npm run build:ios:mine:release
npm run build:ios:service:release
npm run build:ios:business:release
npm run build:ios:hotActivity:release


node buildServer/nodeServer.js ios
echo "\n"
echo "--- start to zip... ---"
zip -r -q -o ./target/archiver.zip target/

echo "--- build success!!! ---"
