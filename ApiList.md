# DevConnect APIs

# authRoter

- POST /signup
- POST /login
- POST /logout

# profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:request

# userRouter

- GET /user/connections/accepted
- GET /user/requests/received
- GET /user/feed

# Deployment

- Signup on AWS
- launch instance
- chmod 400 <secret>.pem
- Login to EC2 terminal: ssh -i "<secret>.pem" ubuntu@ec2-13-126-64-110.ap-south-1.compute.amazonaws.com
- Install nvm for setting up node js to the instance
- Clone the git projects to the ec2 instance

# Backend

- Allowed EC2 instance public IP on MongoDB
- npm i
- npm i pm2 -g
- pm2 start npm --name "<name>" -- start
- pm2 list, pm2 flush/stop/delete <name>
- config nginx: sudo nano /etc/nginx/sites-available/default
- location /api/ {
  proxy_pass http://localhost:7777/;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  }
- sudo systemctl restart nginx
