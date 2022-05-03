import app from "./app";
import config from "./config";

const port = config.PORT || 8000;

//Listening to the server
app.listen(port, () => {
  console.log(
    `Vegur's server started successfully at port: http://localhost:${port}`
  );
});
