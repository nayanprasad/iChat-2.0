import express from 'express';
const app = express();




const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running in PORT:${PORT}`);
})
