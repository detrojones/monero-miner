const CoinHive = require('coin-hive');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinHive('2vaQQnkRKiBdxrOFTzrfqjtJpFlNSgSL'); // Coin-Hive's Site Key
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));

  var template = fs.readFileSync("./index.html", "utf8");

  function onRequest(req, res) {
    
      var source = {
        message : "Hello world!"
      };
    
      var pageBuilder = handlebars.compile(template);
      var pageText = pageBuilder(source);
      res.writeHead(200, {"Context-Type": "text/html"});
      res.write(pageText);
      res.end();
    }
    
    http.createServer(onRequest).listen(8000);
    console.log("Server has started on port 8000.");
 
  

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
