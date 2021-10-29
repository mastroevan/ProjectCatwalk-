const path = require('path');
const express = require('express'); // npm installed
const productsRouter = require('./controllers/productsController.js');
const questionsRouter = require('./controllers/questionsController.js');
const cartRouter = require('./controllers/cartController.js');
const reviewsRouter = require('./controllers/reviewsController.js');
const interactionsRouter = require('./controllers/interactionsController.js')

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/products', productsRouter);

app.use('/reviews', reviewsRouter);

app.use('/questions', questionsRouter);

app.use('/cart', cartRouter);

app.use('/interactions', interactionsRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
