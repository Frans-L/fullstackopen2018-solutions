#!/bin/bash
npm run build
rm -rf ../phonebookBackend/build
cp -r build ../phonebookBackend/
