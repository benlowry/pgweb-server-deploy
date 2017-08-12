curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source $HOME/.bashrc
nvm install 8.1.4
npm install pm2 -g
pm2 start main.js --name pgweb-server-deploy
pm2 start pgweb_linux_amd64 --skip-open --sessions --prefix=$PGWEB_PREFIX --listen=$PGWEB_PORT
pm2 save
sudo pm2 startup ubuntu