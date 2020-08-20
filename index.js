const express = require('express');

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    console.log('GET /');

    res.send('<h1>Authors API</h1>');
});

const authors = [
    {
        name: 'Lawrence Nowell',
        nationality: 'UK',
        books: ['Beowulf']
    },
    {
        name: 'William Shakespeare',
        nationality: 'UK',
        books: ['Hamlet', 'Othello', 'Romeo and Juliet', 'Macbeth']
    },
    {
        name: 'Charles Dickens',
        nationality: 'US',
        books: ['Oliver Twist', 'A Christmas Carol']
    },
    {
        name: 'Oscar Wilde',
        nationality: 'UK',
        books: ['The Picture of Dorian Gray', 'The Importance of Being Earnest']
    },
]

app.get('/authors/:id', (req, res) => {
    console.log('GET /authors/:id');
    const currentAuthor = authors[req.params.id - 1];    

    if (!currentAuthor) {
        res.send(`<h2>No author on ID ${req.params.id}</h2>`);        
        return;
    }
        
    const name = currentAuthor.name;
    const nationality = currentAuthor.nationality;
    const authorIdentity = `<h2>${name}, ${nationality}</h2>`;
    
    const authorIdentityObj = {
        name,
        nationality
    };

    // res.send(authorIdentity) //Exercice 2
    res.json(authorIdentityObj);
        
});

app.get('/authors/:id/books', (req, res) => {
    console.log('GET /authors/:id/books');
    const currentAuthor = authors[req.params.id - 1];

    if (!currentAuthor) {
        res.send(`<h2>No author on ID ${req.params.id}</h2>`);        
        return;
    }
    
    const books = currentAuthor.books;    
    const booksList = books.map(book => `<ul><li>${book}</li></ul>`);    
    const booksObj = {
        books
    };

    // res.send(`<h2>Books:</h2>${booksList.join('')}`); //Exercice 2
    res.json(booksObj);
})

app.get('*', (req, res) => {
    console.log('GET *'),

    res.send('<h2>Error <a href="/"> Return to the homepage</a></h2>')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})