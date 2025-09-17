
const sumRequestHandler = (req,res) => {
    console.log(req.url, req.method);
    const body = [];
    req.on('data', (chunk) => {
        // console.log(chunk);
        body.push(chunk);
        console.log(body);
    });

    req.on('end', ()=>{
        const fullBody = Buffer.concat(body).toString();
        // console.log(fullBody);
        const params = new URLSearchParams(fullBody);
        // console.log(params);
        const bodyObject = {};
        for( const [key, value] of params.entries()){
            bodyObject[key] = value;
        }
        console.log(bodyObject);
        const result = Number(bodyObject.first) + Number(bodyObject.second);
        console.log(result);

    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Calculator</title></head>
            <body>  
                <h1>Your sum is ${result}</h1>
            </body>
        </html>
    `);

    return res.end();
    });
}

module.exports = sumRequestHandler;