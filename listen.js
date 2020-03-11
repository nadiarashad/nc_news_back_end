const app = require('../../back_end/be-nc-news/app')

// app.listen(9990, err => {
//     if (err) console.log(err);
//     else console.log('listening...');
// });

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));