# GlobeTrotter API Contract

All APIs return

Success

{
    "success": true,
    "message": "...",
    "data": {}
}

Failure

{
    "success": false,
    "message": "...",
    "error": {}
}

--------------------------------

AUTH

POST /api/auth/register

Body

{
"name":"",
"email":"",
"password":""
}

Response

{
"success":true,
"data":{
"user":{},
"token":""
}
}

--------------------------------

POST /api/auth/login

Body

{
"email":"",
"password":""
}

--------------------------------

GET /api/auth/me

--------------------------------

TRIPS

GET /api/trips

POST /api/trips

Body

{
"title":"",
"description":"",
"startDate":"",
"endDate":"",
"coverImage":"",
"visibility":"public"
}

--------------------------------

GET /api/trips/:tripId

PUT /api/trips/:tripId

DELETE /api/trips/:tripId

--------------------------------

TRIP STOPS

POST /api/trips/:tripId/stops

Body

{
"cityId":"",
"arrivalDate":"",
"departureDate":"",
"order":1
}

PUT /api/stops/:stopId

DELETE /api/stops/:stopId

--------------------------------

ACTIVITIES

GET /api/activities

GET /api/activities?cityId=

POST /api/stops/:stopId/activity

DELETE /api/stops/:stopId/activity/:activityId

--------------------------------

CITIES

GET /api/cities

GET /api/cities/search?q=

--------------------------------

BUDGET

GET /api/trips/:tripId/budget

--------------------------------

CALENDAR

GET /api/trips/:tripId/calendar

--------------------------------

COMMUNITY

GET /api/community

POST /api/community/:tripId/copy