#!/bin/bash

set -e
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

echo "--- build android file ... ---"

#npm run build:android:remind:debug
#npm run build:android:mine:debug
#npm run build:android:service:debug
#npm run build:android:hotActivity:debug
#npm run build:android:business:debug

npm run build:android:remind:test
npm run build:android:mine:test
npm run build:android:service:test
npm run build:android:business:test
npm run build:android:hotActivity:test

npm run build:android:remind:release
npm run build:android:mine:release
npm run build:android:business:release
npm run build:android:service:release
npm run build:android:hotActivity:release


node buildServer/nodeServer.js android
echo "\n"
echo "--- start to zip... ---"
zip -r -q -o ./target/archiver.zip target/

echo "--- build success!!! ---"
