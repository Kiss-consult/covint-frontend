#! /bin/bash

# Substitute the environment variables in the configuration file
envsubst </app/usr/share/nginx/html/assets/config.templ.json > /app/usr/share/nginx/html/assets/config.json

# Substitute the configured base href in the index.html file
OLD_LINE="^  <base href=\"/\">"
NEW_LINE="  <base href=\"$BASE_HREF\">"
sed -i "s|$OLD_LINE|$NEW_LINE|" /app/usr/share/nginx/html/index.html
