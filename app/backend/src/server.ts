import serverHttp from './app';

const PORT = 3001;

serverHttp.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));
