const http = require('http');
const fs = require('fs');
const port = 3000;
const server = http.createServer((req, res) => {
    let path = './views/';
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/contact':
            path += 'contact.html';
            break;
        case '/contact-us':
            res.statusCode=301;
            //redirect 
            res.setHeader('Location','/contact');
            res.end();
            break;
        default:
            path += '404.html';
            break;
    }
    let header='';
    fs.readFile('./views/header.html','utf-8',(err,data)=>{
        if(err)
        {
            res.end('Something Went Wrong');
        }
        else{
            header=data;
        }
    })
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            res.end('Something Went Wrong!');
        }
        else {
            res.write(header);
            res.end(data);
        }
    })
});

server.listen(port, 'localhost', () => {
    console.log(`server running on port number ${port}`);
})
