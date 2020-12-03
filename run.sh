DIR="/var/wwww/backend/node_modules"
if [ -d "$DIR" ]; then
  ### Take action if $DIR exists ###
  rm node_modules
  yarn install
  pm2 restart app.js
else
  ###  Control will jump here if $DIR does NOT exists ###
  yarn install
  pm2 restart app.js
fi