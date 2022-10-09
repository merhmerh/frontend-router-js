# Frontend Router

A Vanilla JS frontend router.

# Features:

-   0️ Dependencies.
-   Ultra light weight

## Installation

```node
npm i frontend-router-js
```

## Usage

```javascript
const router = require("frontend-router");

function routes() {
    const main = document.getElementById("main");

    router.get("/", (req, res) => {
        res.render("<h1>HOME PAGE</h1>", main);
    });

    router.get("/contact", (req, res) => {
        res.render("<h1>CONTACT US</h1>", main);
    });
}

router.init(routes);
```

## Options

### `router.get(routename, callback(request, response))`

Register a callback function on routename.

#### `request.query`

return an object containing key value pair from URL query.

#### `request.query.key`

return value from key value pair

```js
router.get("/user?name=john", (req, res) => {
    const name = req.query.name; //return john
});
```

#### `request.protocol`

return http or https

#### `request.hostname`

return hostname from the Host HTTP header

#### `request.path`

return pathname request URL

#### `response.render(html, container)`

override existing content in container and replace with html.

#### `router.init(routes,{options})`

Initialize router, options is optional. default to empty object.

`options.container`

Add event listener for \<a> elements in specified container.
Default to all \<a> in page.

```js
const options = {
    container: document.getElementById('container');
}
router.init(routes,options)
```
