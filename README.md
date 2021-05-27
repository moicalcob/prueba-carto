# prueba-geographica

## Ticket 1

The problem was that the client was initializing the popup without content. Leaflet´s popups have a method called 'setContent' to bind the content of the popup. To fix it the client should use this method in order to set the HTML content of the popup while it´s opening.

You can find the resolution in tickets/ticket1.html (line 73)

## Ticket 2

The query is selecting from a table that contains the countries in the EU each country's name, total population (this is obtained using the relationship with populated_places' table) and the number of populated places for each country. The relationship is been established with PostGIS when a country and a populated place is sharing the same space (obtained by the ST_Intersects operation).