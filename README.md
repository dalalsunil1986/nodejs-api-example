# nodejs-api-example

Example project for API creation using NodeJS

Tech stack

* sqlite3
* nodejs (see dependencies in package.js), but mainly uses express to serve content

# Schema of `users` table inside `database.db`

The table is created with the following command.  
Note that `id` is not `AUTOINCREMENT`.

```
CREATE TABLE users (id int PRIMARY KEY NOT NULL, name varchar(20), password varchar(20), profession varchar(20));
```

# Support API end-point

Supported end-point is as follows

* `/listUsers`  
   `GET` method  
   Get list of users.

# Credits

* Good starting point to follow to build up database structure, and overview approach using NodeJS API [https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm](https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm)
* [sqlite3 on Github](https://github.com/mapbox/node-sqlite3)
* [Tutorial](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters) on using expressjs to get GET/POST parameters

# License

Project is licensed under [MIT](https://github.com/haxpor/nodejs-api-example/blob/master/LICENSE).
