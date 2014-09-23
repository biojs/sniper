var fs = require('fs');
var union = require('union');
var director = require('director');
var swig = require('swig');
var ecstatic = require('ecstatic');
var router = new director.http.Router();
var path = require('path');
var join = path.join;
var deepcopy = require('deepcopy');

var Sniper = require('./sniper');

var Server = module.exports = function(opts){

  var dirname = opts.dirname || __dirname;

  var templateDir = join(__dirname, "templates");
  var snipTemplate = join(templateDir, "template.html");
  var listTemplate = join(templateDir, "list.html");
  var allTemplate = join(templateDir, "all.html");

  var getParsed = function(){
    var filename = join(dirname,opts.config);
    var parsed = JSON.parse(fs.readFileSync(filename, 'utf8')).sniper;

    this.snippetFolder = join(dirname,opts.snippets);
    console.log("parsed", parsed);
    if(parsed == undefined){
      throw("please define a sniper section in your package.json");
    }
    return parsed;
  }


  getParsed();
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
    var parsed = getParsed();
    snips.forEach(function(snip){
      snipStr.push({ content: sniper.buildSnippet(snip,parsed),
        name: snip,
        baseHref: "snippets"});
    });
    this.res.write(sniper.renderHead(snipTemplate,parsed));
    var template = swig.compileFile(allTemplate);
    this.res.end(template({snips: snipStr, baseHref: "snippets"}));
  });

  router.get("/snippets/:name", function (name) {
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    var parsed = getParsed();
    var buffer = sniper.buildSnippet(name,parsed); 
    this.res.write(sniper.renderHead(snipTemplate,parsed));
    this.res.end(buffer);
  });

  router.get(/snippets(\/)?/, function (name) {
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    var template = swig.compileFile(listTemplate);
    this.res.end(template({snips: sniper.getSnippets(), baseHref: "snippets"}));
  });
  this.server.listen(9090);
};
