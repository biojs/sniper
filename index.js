var fs = require('fs');
var union = require('union');
var director = require('director');
var swig = require('swig');
var ecstatic = require('ecstatic');
var router = new director.http.Router();
var path = require('path');
var join = path.join;
var deepcopy = require('deepcopy');

// TOML
var toml = require('toml');
var Sniper = require('./sniper');

var Server = module.exports = function(opts){

  var dirname = opts.dirname || __dirname;
  var snippetFolder = join(dirname,opts.snippets);

  var templateDir = join(__dirname, "templates");
  var snipTemplate = join(templateDir, "template.html");
  var listTemplate = join(templateDir, "list.html");
  var allTemplate = join(templateDir, "all.html");

  var parsed = toml.parse(fs.readFileSync(join(dirname,opts.toml), 'utf8'));
  var sniper = new Sniper({snippetFolder: snippetFolder});

  var options = {
    before: [
      function (req, res) {
        var found = router.dispatch(req, res);
        if (!found) {
          res.emit('next');
        }
      },
      ecstatic({
        root: dirname,
        showDir : true,
      })
    ]
  };


  this.server = union.createServer(options);

  router.get("/snippets/all", function (name) {
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    var snips = sniper.getSnippets();
    var snipStr = [];
    var parsedD = deepcopy(parsed);
    snips.forEach(function(snip){
      snipStr.push({ content: sniper.buildSnippet(snip,parsedD),
        name: snip});
    });
    this.res.write(sniper.renderHead(snipTemplate,parsedD));
    var template = swig.compileFile(allTemplate);
    this.res.end(template({snips: snipStr, baseHref: "snippets"}));
  });

  router.get("/snippets/", function (name) {
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    var template = swig.compileFile(listTemplate);
    this.res.end(template({snips: sniper.getSnippets(), baseHref: "snippets"}));
  });

  router.get("/snippets/:name", function (name) {
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    var parsedD = deepcopy(parsed);
    var buffer = sniper.buildSnippet(name,parsedD); 
    this.res.write(sniper.renderHead(snipTemplate,parsedD));
    this.res.end(buffer);
  });

  this.server.listen(9090);
};
