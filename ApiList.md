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
