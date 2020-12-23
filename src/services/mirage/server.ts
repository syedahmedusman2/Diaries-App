import { Server, Model, Factory, Response, belongsTo, hasMany } from 'miragejs';
import user from './routes/user';
import * as diary from './routes/diary';



const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://dailydiaries.surge.sh/"; // site that doesn’t send Access-Control-*
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

export const handleErrors = (error: any, message = 'An error ocurred') => {
  console.error('Error: ', error);
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};

export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? 'development',

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: 'test',
        password: 'password',
        email: 'test@email.com',
      }),
    },

    seeds: (server): any => {
      server.create('user');
    },

    routes(): void {
      this.urlPrefix = 'http://dailydiaries.surge.sh/';

      this.get('/diaries/entries/:id', diary.getEntries);
      this.get('/diaries/:id', diary.getDiaries);

      this.post('/auth/login', user.login);
      this.post('/auth/signup', user.signup);

      this.post('/diaries/', diary.create);
      this.post('/diaries/entry/:id', diary.addEntry);

      this.put('/diaries/entry/:id', diary.updateEntry);
      this.put('/diaries/:id', diary.updateDiary);
    },
  });
};