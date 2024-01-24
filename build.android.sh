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
mkdir -p target/debug/rp-react-native-mobile-cli/pages/
mkdir -p target/test/rp-react-native-mobile-cli/pages/
mkdir -p target/release/rp-react-native-mobile-cli/pages/

echo "--- build android file ... ---"

#npm run build:android:home:debug


npm run build:android:home:test


npm run build:android:home:release


node buildServer/nodeServer.js android
echo "\n"
echo "--- start to zip... ---"
zip -r -q -o ./target/archiver.zip target/

echo "--- build success!!! ---"
