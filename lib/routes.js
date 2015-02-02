var swig = require('swig');
var path = require('path');
var join = path.join;

var Sniper = require('./sniper');

module.exports = function(opts) {
  var self = this;
  var router = opts.router;
  this.parsed = opts.parsed;
  this.snippetFolderName = opts.parsed.snippetFolderName;

  opts.evt.on("config:update", function(config) {
    console.log("new config");
    self.parsed = config;
  });

  // define templates
  var templates = {
    snip: "template.html",
    list: "list.html",
    all: "all.html"
  };

  var templateDir = join(__dirname, "/../templates");
  for (var key in templates) {
    templates[key] = join(templateDir, templates[key]);
  }

  var sniper = new Sniper({
    snippetFolder: this.parsed.snippetFolder
  });

  // detail view
  router.get("/" + this.snippetFolderName + "/:name", function(name) {
    this.res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var buffer = sniper.buildSnippet(name, self.parsed);
    this.res.write(sniper.renderHead(templates.snip, self.parsed));
    this.res.end(buffer);
  });

  router.get("/" + "emu-" + this.snippetFolderName + "/:name", function(name) {
    this.res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var buffer = sniper.buildSnippet(name, self.parsed);
    this.res.write(sniper.renderHead(templates.snip, self.parsed));
    this.res.end(buffer);
  });


  // overview listing
  router.get(new RegExp(this.snippetFolderName + "(\/)?"), function() {
    this.res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var template = swig.compileFile(templates.list);
    var snippetFolder = self.snippetFolderName;
    this.res.end(template({
      snips: sniper.getSnippets(),
      baseHref: snippetFolder
    }));
  });

  // display all snippets in one page
  router.get("/" + this.snippetFolderName + "/all", function() {
    this.res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var snips = sniper.getSnippets();
    var snipStr = [];

    var snippetFolder = self.snippetFolderName;
    snips.forEach(function(snip) {
      snipStr.push({
        content: sniper.buildSnippet(snip, self.parsed),
        name: snip,
        baseHref: snippetFolder
      });
    });
    this.res.write(sniper.renderHead(templates.snip, self.parsed));
    var template = swig.compileFile(templates.all);
    this.res.end(template({
      snips: snipStr,
      baseHref: snippetFolder
    }));
  });

};
