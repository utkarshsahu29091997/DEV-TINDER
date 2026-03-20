# DevTinder APIs

## authRouter
- POST /signUp
- POST /login
- POST /logout

## profileRouter
- POST /profile/view
- POST /profile/edit
- POST /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepeted/:requesdId
- POST /request/review/rejected/:requesdId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed