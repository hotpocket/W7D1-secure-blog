#!/usr/bin/env bash

host="http://localhost:5000/api/user/register"

# if $1 has a dash, generate random alpha chars between those two ranges
# else if $1 is a number, generate that many random alpha chars
rand(){  # error checkins is lacking  ='(
  genSize=$1
  has_dash='^[0-9]+-[0-9]+$'
  is_number='^[0-9]+$'
  if [[ $genSize =~ $has_dash ]]; then
    range_parts=(${1//-/ }); start=${range_parts[0]}; end=${range_parts[1]}
    genSize=$((RANDOM % ($end - $start + 1) + $start)) # thank you copilot
  fi
  if ! [[ $genSize =~ $is_number ]]; then
    echo "Usage: rand <number> | rand <start>-<end>"
    return 1
  fi
  validChars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  cat /dev/urandom |  tr -dc "$validChars" | head -c$genSize
}

read -r -d '' postBodyData << HEREDOC_BLOCK
{
  "fullname" : "`rand 5-7` `rand 7-9`",
  "email"    : "`rand 6-8`@`rand 8-14`.com",
  "password" : "`rand 5-10`"
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


