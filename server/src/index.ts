import app from './app'


// 
// Run the express server - split off from the app file for supertest
// 
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});