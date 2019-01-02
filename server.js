const express = require('express');
const hbs = require('hbs')
const fs = require('fs')

var app = express();
app.set('view_engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase();
});

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) console.log('Impossível escrever o arquivo de log.');
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs') 
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
 res.render('home.hbs', {
     title: 'Home page',
     content: 'Bem vindo!',
 })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'Sobre nós',
        content: 'Algumas palavras sobre a empresa!',
    })
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
        title: 'Portifólio',
        content: 'Nossos Trabalhos',
    })
});

app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}`)
});
