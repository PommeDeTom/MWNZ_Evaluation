const https = require('https');
const http = require('http');
const xml2js = require('xml2js');

const xmlUrl = "https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api"
 

http.createServer(function (req, res) {
	
	try {
		//Find xml file from ID in request url (eg. http://localhost:8080/2)
		https.get(xmlUrl + req.url.toString() + ".xml", res2 => {
			
			let rawData = '';	
			res2.on('data', d => { rawData += d; });
			res2.on('end', () => {
				
				xml2js.parseString(rawData,  (err, result) => {
					
					//Return error if xml file isn't found or cannot be parsed
					if (err) {
						var jsonError = {"error":"Not Found", "error_description":err.toString()}
						res.writeHead(404);
						res.end(JSON.stringify(jsonError));
					} 
					//Return company in JSON format if xml is found
					//TODO error checking to ensure xml format matches the specification
					else {
						var jsonCompany = {"id":parseInt(result.Data.id),"name":result.Data.name[0],"description":result.Data.description[0]};
						res.writeHead(200);
						res.end(JSON.stringify(jsonCompany));
					};
				}); 
			})
		})
	} 
	catch (e) {
		console.log(e);
	}

}).listen(8080);

