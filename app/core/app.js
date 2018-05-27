module.exports = (env, express, cors, helmet,
  localAuthenticator, bodyParser, userRouter) => {

  let app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(localAuthenticator.initialize());
  app.use(userRouter);

  return app;
};