# Quechall
[Quechall](https://quechall.space) is a password manager and note taking app.

## Functions
- Open-source AES encryption on client-side.
- API endpoint for a quick saving.
- No need of usage of email.
- Password generator.
- Note taking and supporting MD (markdown) syntax.

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

RUN `npm start-client` <br/>
Runs the app front-end in the development mode.

RUN `npm run build`<br/>
Builds the app for production to the build folder.

RUN `npm start`<br/>
This will run express.

## bcrypt error
if you cannot find bcrypt module
```bash
$ cd node_modules/bcrypt
$ node-pre-gyp install --fallback-to-build

$ npm i node-gyp
```

## Self-Host
Before usage you should change default things in `config.json`, to not put your self in danger.
And if using own domain change `src/vhost.js` file.

mailUser and mailPass doesn't matter in case of public hosting, its for feedback route.

You can use any secret for a refresh and access token, just change it.

```json
{
   "HOST": "0.0.0.0",
   "PORT": 6500,
   "REFRESH_TOKEN_SECRET": "string",
   "ACCESS_TOKEN_SECRET": "string",
   "saltRounds": 10,
   "production": false,
   "mailUser": "string",
   "mailPass": "string"
}
```

Note: "Don't worry the creds for my email are resetted and tokens are already swapped on the public hosting."

