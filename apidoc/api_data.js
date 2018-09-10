define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Authentication",
    "group": "General",
    "parameter": {
      "examples": [
        {
          "title": "Request",
          "content": "{\n   \"username\":\"any-username\",\n   \"password\":\"any-password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respose",
          "content": "{\n   \"accessToken\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...\",\n   \"expiresIn\": 1531936602893,\n   \"tokenType\": \"bearer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controller/index.js",
    "groupTitle": "General",
    "name": "PostLogin"
  },
  {
    "type": "delete",
    "url": "/api/v1/product/:id",
    "title": "Delete a product",
    "group": "Product",
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controller/index.js",
    "groupTitle": "Product",
    "name": "DeleteApiV1ProductId"
  },
  {
    "type": "get",
    "url": "/api/v1/product",
    "title": "Get all products",
    "group": "Product",
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "[\n    {\n        \"name\": \"Product Name\",\n        \"description\": \"Product Description\",\n        \"quantity\": 100,\n        \"id\": \"708303a0-89f4-11e8-b3e3-c7a13cf0f3f4\",\n    },\n    {\n        \"name\": \"Product Name\",\n        \"description\": \"Product Description\",\n        \"quantity\": 2,\n        \"id\": \"76d9f060-89f4-11e8-b3e3-c7a13cf0f3f4\",\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controller/index.js",
    "groupTitle": "Product",
    "name": "GetApiV1Product"
  },
  {
    "type": "get",
    "url": "/api/v1/product/:id",
    "title": "Get product by id",
    "group": "Product",
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"name\": \"Product Name\",\n    \"description\": \"Product Description\",\n    \"quantity\": 2,\n    \"id\": \"76d9f060-89f4-11e8-b3e3-c7a13cf0f3f4\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controller/index.js",
    "groupTitle": "Product",
    "name": "GetApiV1ProductId"
  },
  {
    "type": "post",
    "url": "/api/v1/product/",
    "title": "Creates a new product",
    "group": "Product",
    "parameter": {
      "examples": [
        {
          "title": "Request",
          "content": "{\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controller/index.js",
    "groupTitle": "Product",
    "name": "PostApiV1Product"
  },
  {
    "type": "put",
    "url": "/api/v1/product/",
    "title": "Update a product",
    "group": "Product",
    "parameter": {
      "examples": [
        {
          "title": "Request",
          "content": "{\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controller/index.js",
    "groupTitle": "Product",
    "name": "PutApiV1Product"
  }
] });
