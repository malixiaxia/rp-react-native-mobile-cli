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
mkdir -p target/debug/rp-react-native-mobile-cli/pages/
mkdir -p target/test/rp-react-native-mobile-cli/pages/
mkdir -p target/release/rp-react-native-mobile-cli/pages/

echo "--- build ios file ... ---"
#npm run build:ios:home:debug



npm run build:ios:home:test


npm run build:ios:home:release



node buildServer/nodeServer.js ios
echo "\n"
echo "--- start to zip... ---"
zip -r -q -o ./target/archiver.zip target/

echo "--- build success!!! ---"
