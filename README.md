# HTTP (Express) single resource server with persistence

## Description

This HTTP server performs CRUD (create/read/update/delete) operations on 
different resource types. Resource types could be, for example, notes, 
dogs, cats, cars, etc. The resource type is specified as the first part 
of the URL path, and specific resources may be referred to by passing 
them in the second part of the URL path. A resource can be any JSON object
as long as it has the property "id" that will be used to refer to the 
stored object for updating, retrieval, or deleting.

## Motivation

This was written as a lab assignment for Code Fellows 401 class. The 
code was refactored to generalize data storage for arbitrary object types, 
as well as to make it more modular so it's easier to grow and maintain.

## API Reference

`GET http://<hostname>/notes` returns all notes resources as JSON objects

`GET http://<hostname>/notes/:id` returns the note at a specific id as JSON

`POST http://<hostname>/cats` with a cat object (as JSON) stored on the message body stores 
the cat object at its specified id. A cat object might be in the form 
{ id: "cat1", name: "Garfield", breed: "Tabby" }. In this case "id" needs to be specified
in the object since we're creating new storage for it.

`PUT http://<hostname>/dog/:id` with content (as JSON) stored on the message body replaces 
the content of the dog object at id. New content for an existing dog object 
{ id: "dog2", name: "Shadow", breed: "Australian Shepard" } might be in the form 
{ breed: "Flat-Coated Retriever" }. The only restriction is the PUT data should not contain
"id" since that's specified in the request - we're updating data, not changing the id.

`DELETE http://<hostname>/car/:id` removes the car object at id from the server.

## Tests

The accompanying test suite can be run using the 'npm test' command.

## Contributors

[Mark Greenwood](https://github.com/markgreenwood)

## License

The MIT License (MIT)
Copyright (c) 2016 Mark Greenwood

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
