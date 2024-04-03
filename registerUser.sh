#!/usr/bin/env bash

host="http://localhost:5000/api/user/register"
outfile="response.json"

echo

curl -Ss -XPOST "$host" \
     -H 'Content-Type: application/json' \
     -d '{"fullname" : "brandon landry",
          "email"    : "alskdjfa@alksjdlfa.com",
          "password" : "omg!" }' \
  | bat -l json --style='grid'

echo
