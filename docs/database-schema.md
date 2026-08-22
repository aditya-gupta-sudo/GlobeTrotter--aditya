# Database Schema

User

id UUID PK

name

email UNIQUE

password

avatar

createdAt

updatedAt

--------------------------------

Trip

id UUID PK

userId FK

title

description

coverImage

startDate

endDate

visibility

createdAt

--------------------------------

City

id UUID PK

name

country

latitude

longitude

averageDailyCost

image

--------------------------------

Activity

id UUID PK

cityId FK

title

description

category

duration

estimatedCost

image

--------------------------------

TripStop

id UUID PK

tripId FK

cityId FK

arrivalDate

departureDate

stopOrder

--------------------------------

TripActivity

id UUID PK

tripStopId FK

activityId FK

dayNumber

startTime

notes

--------------------------------

Relationships

User

1 ---- *

Trip

Trip

1 ---- *

TripStop

City

1 ---- *

Activity

TripStop

1 ---- *

TripActivity

Activity

1 ---- *

TripActivity