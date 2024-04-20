#!/usr/bin/env bash

host="http://localhost:5000/api/user/register"
outfile="response.json"

# $1 = [a|n]  - Generate [n]umbers or [a]lphabet chars
# $2 = number - The number of random characters to generate
rand(){
  # regex must be a variable so meta characters and literals are interpreted seperately
  is_a_or_b='^[ab]$'
  is_digit='^[0-9]+$'
  if ! [[ $1 =~ $is_a_or_b ]] || ! [[ $2 =~ $is_digit ]]; then
    echo "Usage: rand [a|n] <number of characters>"
    return
  fi
  [ "$1" == "a" ] && charset='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  [ "$1" == "n" ] && charset='0-9'
  cat /dev/urandom |  tr -dc "$charset" | head -c$2
}

read -r -d '' postBodyData << HEREDOC_BLOCK
{
  "fullname" : "`rand a 7` `rand a 9`",
  "email"    : "`rand a 7`@`rand a 12`.com",
  "password" : "`rand a 14`"
}
HEREDOC_BLOCK

echo -e "\nPosting:\n
$postBodyData"

echo

# POST: Create a new user
curl -Ss -XPOST "$host" \
     -H 'Content-Type: application/json' \
     -d "$postBodyData"
#     \
#  | bat -l json --style='grid'

echo


