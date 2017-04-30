#!/bin/bash

# spotify_platform_oauth.sh
#
# A script to quickly and easily generate Spotify oauth tokens given a client
# id, secret, and scope. Will authenticate a user via the browser.

# The app must have "http://localhost:8082/' as a redirect_uri

# spotify_client_creds.json should contain a spotify client id and secret pair
# encoded as a json object with properties `id` and `secret`

# TODO grab client id and secret first from args, if not, then this file, if not, exit with an error
client_id=7afafb6c27a84b27a229e2ba0b8432dd
client_secret=461ca36860be4b1fb7907ad06ec262ff
port=8080
redirect_uri=http://localhost:$port
auth_endpoint=https://accounts.spotify.com/authorize/?response_type=code\&client_id=$client_id\&redirect_uri=$redirect_uri
# TODO return cached access token if scopes match and it hasn't expired
# TODO get scopes from args
scopes="playlist-read-private"
if [[ ! -z $scopes ]]
then
  encoded_scopes=$(echo $scopes| tr ' ' '%' | sed s/%/%20/g)
  # If scopes exists, then append them to auth_endpoint
  auth_endpoint=$auth_endpoint\&scope=$encoded_scopes
fi

# TODO if refresh_token exists and is valid for scopes, use refresh flow
open $auth_endpoint
# User is now authenticating on accounts.spotify.com...

# Now the user gets redirected to our endpoint
# Grab token and close browser window
response=$(echo "HTTP/1.1 200 OK\nAccess-Control-Allow-Origin:*\nContent-Length:65\n\n<html><script>open(location, '_self').close();</script></html>\n" | nc -l -c $port)
code=$(echo "$response" | grep GET | cut -d' ' -f 2 | cut -d'=' -f 2)

# I am sorry about this sed. OS X base64 is different to python base64 I guess
response=$(curl -s https://accounts.spotify.com/api/token \
  -H "Content-Type:application/x-www-form-urlencoded" \
  -H "Authorization: Basic $(echo $client_id:$client_secret | base64 | sed 's/K$/=/')" \
  -d "grant_type=authorization_code&code=$code&redirect_uri=$redirect_uri")

# Useful values are
# jq -r '.expires_in'
# may not exist
# jq -r '.scope'

# I'm not actually using this yet, best not store it
# echo $response | jq -r '.refresh_token' > /var/tmp/spotify_refresh_token
# TODO cache access token
echo $response | jq -r '.access_token'
