## Web APIs

Web browsers are programs that allow users to retrieve web pages from servers and can render html and css and interpret javascript code.

There are a number of different web browsers, however each web browser has agreed to provide a standardized api through which commands can be executed in the browser using Javascript, e.g. navigating to a different page, rendering an image, executing an http request etc. This API is denoted the client-side web API.

The web API is organized into different categories, each category is usually accessed through a javascript object. For example `document` is a globally accessible javascript object which lets us manipulate the current web page (or document)
```javascript
var title = document.createElement('h1');
title.textContent = "I was made with javascript!";
document.body.appendChild(title);
```

### Events
Some javascript objects exposed through the API have a lifecycle with certain points at which they call specific methods, e.g. `onClick()` is called whenever a button is clicked, or `onload()` is called when a http request finished executing. See `http.js` for an example.

### Manipulating the Document
The browser display is organized into logical parts, see this picture:
![browser](https://mdn.mozillademos.org/files/14557/document-window-navigator.png)

specifically we have:
* Navigator: this represents the state of the user and its identity, e.g. geolocation would be retrieved from the navigator
* Window: This represents the frame where the page is stored in, can be used for things like getting current width, or changing to different url
* document: this represents the web page currently being viewed.

The document is simply a tree of html elements. Each eement has attributes, e.g. `src` in the tag `<image src="...">` and can contain text.
