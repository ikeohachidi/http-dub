# rest-resources (WIP)
A delightfully easy to use wrapper over the fetch API providing an easier way to create RESTful endpoints. Inspired by Phoenix frameworks "resources" macro.

## Usage
```javascript
const http = http("https://yoururl.com/$1);

// Making a Get request

// "user-id" will be insert into the url in place of $1
http.getReq({
  arguments: {
    $1: "user-id"
  },
  onResolve: () => {},
  onReject: () => {}
})
```

All default http verbs are `getReq, postReq, putReq, deleteReq`

You can also extend it if you have more requests you'd like to make
```
http.extend('functionName', "httpMethod", "appendedPath");
```

You can now run:
```
// you can still pass the same arguments you would to the default requests methods
http.otherReq.functionName()
```
