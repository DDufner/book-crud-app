import * as mongoose from 'mongoose';
import bodyParser from "body-parser";
import 'zone.js/dist/zone-node';
import * as express from 'express';
import {join} from 'path';
import { BookRoute } from './routes/book-route';

const bookRoute: BookRoute = new BookRoute();
console.log(bookRoute);

const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');


const connectionString = 'mongodb+srv://coderGirl:launchCode@cluster0-eb43q.mongodb.net/coder_girl?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
 .then(() => console.log('connection successful'))
 .catch((err) => console.error(err));

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

bookRoute.bookRoute(app);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
