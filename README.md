# React template
Basic template for react with express, typeorm and typescript


## File structre
./api -- express middlewares, typeorm src<br/>
./src -- react<br/>
./ -- configs and express app<br/>


# Quick Start
## Typeorm
If you want also typeorm functional you will need to edit ormconfig.ts by your needs
<https://typeorm.io/> see some quick guides

## App
RUN `npm install && yarn install`<br/>
This will install both run-time project dependencies and developer tools listed in package.json file.

RUN `npm start-client && yarn start-client` <br/>
Runs the app in the development mode.

RUN `npm run build && yarn build`<br/>
Builds the app for production to the build folder.

RUN `npm start && yarn start`<br/>
This will run express.

## bcrypt error
if you cannot find bcrypt module
```bash
$ cd node_modules/bcrypt
$ node-pre-gyp install --fallback-to-build

$ npm i node-gyp
```

## Config.json layout
```json
{
   "HOST": "",
   "PORT": 8000,
   "REFRESH_TOKEN_SECRET": "",
   "ACCESS_TOKEN_SECRET": "",
   "saltRounds": 10,
   "production":
}
```

## Postgresql
```bash
$ sudo service postgresql start
$ sudo -u postgres psql
```
```postgres
$ ALTER USER postgres PASSWORD 'myPassword';
$ CREATE DATABASE "hoffi-web";

$ \c hoffi-web -- connect
$ \d user -- show table
$ select * from public.user; -- show data from table

$ dropdb development_db_name -- remove db
$ createdb development_db_name
```

## API endpoints for custom passwords
POST /api/custom/generate-passwd
curl example:
```bash
curl -X POST HOST/api/custom/generate-passwd -H "Content-Type: application/json" -H 'Cookie: jid=yourJID; accessToken=yourAcessToken' -d '{ "length": "", "name": "" }'
```
If you don't provide anything, length will be default 16 and name will be random generated uuid.
Response:
```JSON
{
   "message": "Success! || Error!", 
   "name": "name || uuid", 
   "content": "content"
}
```

POST /api/custom/getPasswdByName/:name
curl example:
```bash
curl -X POST HOST/api/custom/getPasswdByName/$YourPasswordName -H "Content-Type: application/json" -H 'Cookie: jid=yourJID; accessToken=yourAcessToken'
```

Response:
```JSON
{
   "message": "Success! || Error!", 
   "password": "password || null"
}
```

POST /api/custom/get-passwds
curl example:
```bash
curl -X POST HOST/api/custom/get-passwds -H "Content-Type: application/json" -H 'Cookie: jid=yourJID; accessToken=yourAcessToken' -d '{ "count": "HowMany"}'
```
If you won't specify "count", it will return everything.

Response:
```JSON
{
   "message": "Success! || Error!", 
   "passwords": "passwords || null"
}
```


POST /api/custom/create-passwd
curl example:
```bash
curl -X POST HOST/api/custom/create-passwd -H "Content-Type: application/json" -H 'Cookie: jid=yourJID; accessToken=yourAcessToken' -d '{ "name": "", "content": ""}'
```
If you won't specify "name" or "content", it will give you error with status 401 and message.

Response:
```JSON
{
   "message": "Success! || Error!", 
   "password": "password || null"
}
```

POST /api/custom/delete-passwd/:id
curl example:
```bash
curl -X POST HOST/api/custom/delete-passwd/$PasswordID -H "Content-Type: application/json" -H 'Cookie: jid=yourJID; accessToken=yourAcessToken'
```

Response:
```JSON
{
   "message": "Success! || Error!", 
   "deleted": "id || undefined"
}
```

### Docker
*display all images*
docker images list -a

*display all containers*
docker container ls -a

*container to image*
docker commit <container_id>

*rename image*
docker image tag <image_id> hoffiweb

*run container*
docker run -itp 8000:8000 <container_id> /bin/bash

# LICENCE
MIT.
