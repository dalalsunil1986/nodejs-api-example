# nodejs-api-example

Example project for API creation using NodeJS

Tech stack

* sqlite3
* nodejs (see dependencies in package.js), but mainly uses express to serve content

# Schema of `users` table inside `database.db`

The table is created with the following command.  

```
CREATE TABLE users (id integer PRIMARY KEY AUTOINCREMENT, name varchar(20) NOT NULL, password varchar(20) NOT NULL, profession varchar(20));
```

# Support API end-point

Supported end-point is as follows

* `/listUsers`  
   `GET` method  
   Get list of users.

* `/addUser`  
   `POST` method  
   Add a new user with following parameters spec  

   | Param Name | Type | Required |  
   |:---:|:---:|:---:|
   | name | varchar(20) | YES |  
   | password | varchar(20) | YES |  
   | profession | varchar(20) | NO |

* `/:id`  
   `GET` method  
   Get detail of specific user from `:id`.

# How to Use

1. Start server instance (`index.js` of this project) by executing `node index.js`.
2. Make a client request from either [Postman](https://www.getpostman.com/apps), cURL, or Javascript code.

Please note that you need to know your API URL (server instance that is listening) which depends on your setup.

# Credits

* Good starting point to follow to build up database structure, and overview approach using NodeJS API [https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm](https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm)
* [sqlite3 on Github](https://github.com/mapbox/node-sqlite3)
* [Tutorial](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters) on using expressjs to get GET/POST parameters

# License

Project is licensed under [MIT](https://github.com/haxpor/nodejs-api-example/blob/master/LICENSE).
