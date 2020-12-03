DIR="/var/wwww/backend/node_modules"
if [ -d "$DIR" ]; then
  ### Take action if $DIR exists ###
  rm node_modules
  yarn install
else
  ###  Control will jump here if $DIR does NOT exists ###
  yarn install
  exit 1
fi