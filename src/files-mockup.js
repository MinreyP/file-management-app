const filesData = {
    "0123": [
        {
            "name": "README",
            "extension": "md",
            "id": "b345",
            "content": "### Test Content",
            "parent": "0123"
        },
        {
            "name": "Some Text",
            "extension": "txt",
            "id": "c123",
            "content": "Some Text Content",
            "parent": "0123"
        }
    ],
    "0246": [
        {
            "name": "Index",
            "extension": "html",
            "id": "c456",
            "content": "<h1>Hello World</h1>",
            "parent": "0246"
        },
        {
            "name": "style",
            "extension": "css",
            "id": "c789",
            "content": "body, html{\n  margin: 0; padding: 0;\n}",
            "parent": "0246"
        }
    ],
    "789": [
        {
            "name": "Theme-style",
            "extension": "css",
            "id": "db456",
            "content": "h1, h2, h3 {\n  font-family: arial, helvetica, sans-serif;\n}",
            "parent": "789"
        }
    ]
};

export default filesData;