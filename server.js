const express = require('express');
const connectDb = require('./config/db');

const app = express();
connectDb();
// console.log(connectDb);

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/group',require('./routes/api/group'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
