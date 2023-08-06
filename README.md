# Impression Weather

This project is an ill-advised way to produce a webpage to be displayed on a Pimoroni Inky Impression. It pulls data from OpenWeatherMap and Adafruit IO, where the Adafruit IO data is uploaded by a set of environmental sensors I put together.

## Why is this ill-advised?
Due to the nature of what is being displayed, it would be best to use a server-side HTML rendering technique such as EJS, allowing all the required data to be collected and put into the HTML before handing the HTML over to the page renderer client. Modern browsers do not have a means to easily script a delay from the initial render completion and the actual completion of all JS scripts, so a simple headless screenshot script will not produce something usefull. Instead a tool can be used that makes the renderer think that it is still loading the page until an event has fired, most simply the completion of a timer. This is the method used by the client process in this project as the app is written in React. Were this written in EJS, this would not have been a problem.

## Why'd you do it like this anyway?
Proactice React and get more familiar with passing data objects between different components. I do most of my actual work in Angular, which I personally find to be much more rational in how it moves data around different components, but Angular has a higher set-up cost than React (IE it takes more time to get started) though I'm finding that it has a lower running cost in terms of effort to maintain. All that being said, I may still redo this as an EJS project for the benefits that it would bring
