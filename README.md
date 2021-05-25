# prueba-geographica

## Ticket 1
The problem was that the client was initializing the popup without content. Leaflet´s popups have a method called 'setContent' to bind the content of the popup. To fix it the client should use this method in order to set the HTML content of the popup while it´s opening.

## Ticket 2