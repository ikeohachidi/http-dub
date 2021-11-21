# http-dub
A delightfully easy to use wrapper over the fetch API providing an easier way to create RESTful endpoints. Inspired by Phoenix frameworks "resources" macro.
This project was initially created to simplify http calls in Vuex Actions, but can be used anywhere.

## Usage

```javascript
import { http } from "http-dub"; 

const req = http("https://yoururl.com/:id);
```

**NOTE**  The `:id` will be replaced by a provided argument during execution of one of the http methods, if the value isn't provided it's automatically removed.

### Eg, GET Request
```javascript
req.getReq({
  arguments: {
    // :id will be replaced with "user-id" in the url
    ":id": "user-id"
  },
  onResolve: () => {},
  onReject: (resp) => {<do something>}
})
```

### Custom Request
If an extra route or http method is need besides the one that the library provides you can easily add with the `extend` method. The custom request is available on the `otherReq` method.

```javascript
// req.extend(<funcName>, <method>, <path>)
req.extend("listUsers", "GET", "/list-users");

// The above added extension can now be called with
req.otherReq.listUsers();
```

**NOTE**  The extended path is only available as a subpath of the original URL


List of all Supported **request** methods
```
getReq: "GET" request
postReq: "POST" request
putReq: "PUT" request
deleteReq: "DELETE" request
otherReq: custom requests added with the "extend" method
```
Each of the above takes an object as argument. The object properties are
```javascript
arguments object; // Eg { :id: 5 }
body // body of fetch function
config RequestConfig; // The remaining properties of a fetch functions config excluding body
onResolve // callback function to handle successful request
onReject // callback function which gets the error returned from the request as the first argument 
```

### Hooks
Hooks are provided that can run some code before or/and after a request is made
```javascript
req
  .afterEach(() => {})
  .beforeEach(() => {})
```

If you like the project consider starring on [Github](https://github.com/ikeohachidi/rest-resources). All contributions are welcome, Issues and PR.If you like the project consider starring it on Github