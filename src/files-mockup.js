const filesData = {
    "0123": [
        {
            "name": "README",
            "type": ".md",
            "id": "b345",
            "content": "Test Content",
        },
        {
            "name": "Some Text",
            "type": ".txt",
            "id": "c123",
            "content": "Some Text Content",
        }
    ],
    "0246": [
        {
            "name": "Index",
            "type": ".html",
            "id": "c456",
            "content": "Hello World",
            "parent_folder": "0246"
        },
        {
            "name": "style",
            "type": ".css",
            "id": "c789",
            "content": "color:red",
            "parent_folder": "0246"
        }
    ],
    "789": [
        {
            "name": "Theme-style",
            "type": ".css",
            "id": "db456",
            "content": "color: red",
        }
    ]
};

export default filesData;