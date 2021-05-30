# Carto Test Moisés Calzado Cobo

## Ticket 1

The problem was that the client was initializing the popup without content. Leaflet's popups have a method called 'setContent' to bind the content of the popup. To fix it the client should use this method in order to set the HTML content of the popup while it's opening.

You can find the resolution in tickets/ticket1.html (line 73)

## Ticket 2

The query is selecting from a table that contains the countries in the EU each country's name, total population (this is obtained using the relationship with populated_places' table) and the number of populated places for each country. The relationship is been established with PostGIS when a country and a populated place is sharing the same space (obtained by the ST_Intersects operation).

## Authentication

In order to develop an authentication mechanism I would use API Keys to authenticate the requests received by the backend. APY Keys can be signed with a payload that contains the authenticated user's info and we can store the keys in a database, so it's esay to check how many times an user is calling the API.

With a simple function we could check the user that is signing the request, so we can store in a database the amount of requests that the user is making. With that information, we could make some simple queries to retrieve the price that each user should pay by month.

API Keys can be generated through a webapp developed to manage the billing settings of each user. We could use Stripe, a platform that offers subscriptions to manage the recurring payments that API's users should made each month. This webapp could have a section to register new API's users.

## Deploy

Deploying a NodeJS application is really easy if we use docker. With docker we can create an image with a simple Dockerfile to serve the API with a secure proxy using NGINX. I've created a docker-compose file to deploy the application in a server running docker with: 

```console
docker-compose up -d
```
We have to edit the nginx.conf file with our webserver domain before deploying to a production server.


