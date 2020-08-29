var http = require('http');
var fs = require('fs');
var url = require('url');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'visualchat'
});
 
connection.connect();

http.createServer(function (request, response) {
   var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   
   if (pathname.indexOf(".") >= 0) {
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/html
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{             
         // HTTP 状态码: 200 : OK
         // Content Type: text/html
         if(pathname.indexOf("css") < 0) response.writeHead(200, {'Content-Type': 'text/html'});    
		 else response.writeHead(200, {'Content-Type' : 'text/css'}) ;	         
         // 响应文件内容
         response.write(data.toString());        
      }
      //  发送响应数据
      response.end();
   });
	}
	else {

			var params = url.parse(request.url, true).query; 
		if (pathname == "/users/login") {
  			connection.query('SELECT * from users where username = \'' + params.username + '\' and password = \'' + params.password + '\'', function (error, results, fields) {
  				if (error) {
  					var dataObj = {
  						status : 400, 
  						info : "Internal error!"
  					} ; 

					var dataJson = JSON.stringify(dataObj);
					response.writeHead(200, {'Content-Type' : 'json'}) ; 
					response.write(dataJson) ; 
					response.end();
  					throw error;
  				}
  				if (results.length == 0) {
  					var dataObj = {
  						status : 401, 
  						info : "Wrong username or password！"
  					} ; 

					var dataJson = JSON.stringify(dataObj);
					response.writeHead(200, {'Content-Type' : 'json'}) ; 
					response.write(dataJson) ; 
					response.end();
  				}
  				else {

  					var dataObj = {
  						status : 200, 
  						info : "Login succeeded！"
  					} ; 

					var dataJson = JSON.stringify(dataObj);
					response.writeHead(200, {'Content-Type' : 'json'}) ; 
					response.write(dataJson) ; 
					response.end();
  				}
			});
		}
		else {
					console.log(params.username);
					console.log(params.password);
					connection.query('SELECT * from users where username = \'' + params.username + '\'', function (error, results, fields) {
  				if (error) {
  					var dataObj = {
  						status : 400, 
  						info : "Internal error！"
  					} ; 

					var dataJson = JSON.stringify(dataObj);
					response.writeHead(200, {'Content-Type' : 'json'}) ; 
					response.write(dataJson) ; 
					response.end();
  					throw error;
  				}
  				if (results.length == 0) {
  					console.log('INSERT INTO users (username, password) VALUES (\'' + params.username + '\',\'' + params.password + '\')') ;
  					connection.query('INSERT INTO users (username, password) VALUES (\'' + params.username + '\',\'' + params.password + '\')' , function (err, res, field) {
  				if (err) {
  					var dataObj = {
  						status : 400, 
  						info : "Internal error！"
  					} ; 

					var dataJson = JSON.stringify(dataObj);
					response.writeHead(200, {'Content-Type' : 'json'}) ; 
					response.write(dataJson) ; 
					response.end();
  					throw err;
  				}
  				else {

  					var dataObj = {
  						status : 200, 
  						info : "Register succeeded！"
  					} ; 

					var dataJson = JSON.stringify(dataObj);
					response.writeHead(200, {'Content-Type' : 'json'}) ; 
					response.write(dataJson) ; 
					response.end();
  				}
  				
				});
  				}
  				else {

  					var dataObj = {
  						status : 401, 
  						info : "Account name is already occupied！"
  					} ; 

					var dataJson = JSON.stringify(dataObj);
					response.writeHead(200, {'Content-Type' : 'json'}) ; 
					response.write(dataJson) ; 
					response.end();
  				}
			});
		}
		
	}
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/index.html');
