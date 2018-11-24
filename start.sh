#!/bin/sh
npm run serve:dist &
npm run serve:api &

while true; do sleep 1000; done
