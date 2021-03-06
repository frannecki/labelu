# LabelU
LabelU is A simple image patch label tool based on Flask and ReactJS

## Usage
1. Configuration
   ```sh
   # install dependencies via pip
   pip install requirements
   
   # build frontend app
   cd frontend
   npm install
   npm run build
   ```

2. Deploy
   
   * Install Nginx
   * Edit `nginx/nginx.conf`
   * Replace nginx conf file `conf/nginx.conf` with `nginx/nginx.conf`. (On windows, you can find it where you install nginx)
   * Run backend application

     ```sh
     python wsgi.py
     ```
