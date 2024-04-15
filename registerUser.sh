#!/usr/bin/env bash

host="http://localhost:5000/api/user/register"
outfile="response.json"

# generate 15 random alpha characters
rand15Alpha(){
  echo $(</dev/urandom tr -dc 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' | head -c15);
}

read -r -d '' postBodyData << HEREDOC_BLOCK
{
  "fullname" : "`rand15Alpha` `rand15Alpha`",
  "email"    : "`rand15Alpha`@`rand15Alpha`.com",
  "password" : "`rand15Alpha`"
}
HEREDOC_BLOCK

echo -e "\nPosting:\n
$postBodyData"

echo

# POST: Create a new user
curl -Ss -XPOST "$host" \
     -H 'Content-Type: application/json' \
     -d "$postBodyData" \
  | bat -l json --style='grid'

echo


