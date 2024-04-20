#!/usr/bin/env bash

host="http://localhost:5000/api"

# if $1 has a dash, generate random alpha chars between those two ranges
# else if $1 is a number, generate that many random alpha chars
rand(){
  genSize=$1
  has_dash='^[0-9]+-[0-9]+$'
  is_number='^[0-9]+$'
  validChars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if [[ $genSize =~ $has_dash ]]; then
    range_parts=(${1//-/ });  start=${range_parts[0]};  end=${range_parts[1]}
    genSize=$((RANDOM % ($end - $start + 1) + $start)) # thank you copilot
  fi
  if ! [[ $genSize =~ $is_number ]]; then
    echo "Usage: rand <number> | rand <start>-<end>"
    return 1
  fi
  cat /dev/random |  tr -dc "$validChars" | head -c$genSize
}

# CRUD:
# user (create, read, update, delete)
# post (create, read, update, delete)

# POSTS
# router.post('/', verifyJWT, PostController.CreatePost);                 // Create
# router.get('/:id', verifyJWT, PostController.GetPostById);              // Read (by id)
# router.get('/user/:userId', verifyJWT, PostController.GetPostByUserId); // Read (by user)
# router.put('/:id', verifyJWT, PostController.UpdatePost);               // Update
# router.delete('/:id', verifyJWT, PostController.DeletePostById);        // Delete

# AUTH
# router.post("/login", user.Login);
# router.post("/register", user.Register);


# set -x # turn on tracing

read -r -d '' NEW_USER << JSON_STUFF
{
  "fullname" : "`rand 5-7` `rand 7-9`",
  "email"    : "`rand 6-8`@`rand 8-14`.com",
  "password" : "`rand 5-10`"
}
JSON_STUFF

echo "CREATING USER:"
curl -Ss -XPOST "$host/user/register" \
     -H 'Content-Type: application/json' \
     -d "$NEW_USER"

echo -e "\n\nGETTING LOGIN TOKEN:"
token=`curl -Ss -XPOST "$host/user/login" \
     -H 'Content-Type: application/json' \
     -d "$NEW_USER" | \
     python3 -c "import sys, json; print(json.load(sys.stdin)['token'])"`
echo "$token"

echo -e "\nCREATING POST:"
curl -Ss -XPOST "$host/post" \
     -H 'Content-Type: application/json' \
     -H "Authorization: Bearer $token" \
     -d '{"title": "'`rand 8-15`'", "description": "'`rand 25-55`'"}'
echo







