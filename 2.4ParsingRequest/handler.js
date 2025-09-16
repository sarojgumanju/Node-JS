
const fs = require("fs");

const userRequestHandler = (req,res) => {
    console.log(req.url, req.method);

    if(req.url === "/"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Saroj Node Practice</title></head>');
        res.write('<body>');
        res.write('<h1>Enter your details.</h1>');
        res.write('<form action="/submit-userDetails" method="POST">');
        res.write('<input type="text" placeholder="Enter your name" name="username">');
        res.write("<br>");
        res.write('<label for="gender">Gender:  </label>');
        res.write('<label for="male">Male</label>');
        res.write('<input type="radio" id="male" name="gender" value="male">');
        res.write('<label for="female">Female</label>');
        res.write('<input type="radio" id="female" name="gender" value="female">');
        res.write("<br>");
        res.write('<button type="submit" value="Submit">Submit</button>')
        res.write('</form>');
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }

    else if(req.url.toLowerCase() === "/submit-userdetails" && req.method == "POST"){
        const body = []; // empty array for collecting chunk
        req.on('data', (chunk) => { // req.on lets you listen for request stream events(data,end,error)
            console.log(chunk);
            body.push(chunk); // pushing chunks of data to the empty array to get the combined output
        });

        // done receiving data
        req.on("end", () => { // end event tells you no more chunks are coming
            const fullBody = Buffer.concat(body).toString();
            console.log(fullBody);
            const params = new URLSearchParams(fullBody); //URLSearchParams is a built-in JavaScript class that makes it easy to work with query strings (the part of a URL after ?) or URL-encoded form data.
            // It allows you to read, add, update, or delete query parameters.
            
            // const bodyObject = {};
            // for(const [key, value] of params.entries()){ // .entries() is a method that returns an iterator of all key-value pairs in the form: [key, value].
            //     bodyObject[key] = value;
            // }

            // shortcut method  
            const bodyObject = Object.fromEntries(params);
            console.log(bodyObject);

            // writin in user.txt file in JSON format
            const jsonString = JSON.stringify(bodyObject);
            console.log(jsonString);
            fs.writeFileSync('user.txt', jsonString);
            // Or fs.writeFileSync('user.txt', JSON.stringify(bodyObject));
        })

        res.statusCode = 302; // 302 status code means redirection  
        res.setHeader('Location', '/');
        res.end();

    }
 
    else if(req.url.toLowerCase() === "/products"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Saroj Node Practice</title></head>');
        res.write('<body><h1>This is product page.</h1></body>')
        res.write('</html>');
        return res.end();
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Saroj Node Practice</title></head>');
        res.write('<body><h1>404 error page not found.</h1></body>')
        res.write('</html>');
        res.end();
    }
};

module.exports = userRequestHandler;

