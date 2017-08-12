curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 8.1.4
npm install pm2 -g
pm2 start main.js --name pgweb-bookmarks
pm2 start pgweb_linux_amd64 --name pgweb -- --skip-open --sessions --prefix=$PGWEB_PREFIX --listen=$PGWEB_PORT
pm2 save
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v8.1.4/bin /home/ubuntu/.nvm/versions/node/v8.1.4/lib/node_modules/pm2/bin/pm2 startup ubuntu -u ubuntu --hp /home/ubuntu