#!/bin/sh
set -e

node server.js

tail -f /dev/null 