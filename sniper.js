var toml = require('toml');
var fs = require('fs');
var path = require('path');
var join = path.join;
var swig = require('swig');

var Sniper = module.exports = function(opts){
  
  this.opts = opts;
  var self = this;

  // removes the extension and filters duplicates
  this.getSnippets = function(){
    var snips = fs.readdirSync(self.opts.snippetFolder);
    var snipsFiltered = [];
    snips.forEach(function(entry){
      var file = entry.split(".")[0];
      if(snipsFiltered.indexOf(file) < 0){
        snipsFiltered.push(file);
      }
    });
    return snipsFiltered;
  };

  // parses and add a special config for each snippet
  this.addToml = function(name,parsedD){
    var parsedConfig = toml.parse(fs.readFileSync(name, 'utf8'));
    // merge stuff
    if( parsedConfig["js"] !== undefined){
      parsedConfig["js"].forEach(function(entry){
        parsedD.snippetJS.push(entry);
      });
    }
  };

  // displays the script tags
  this.renderHead = function(snipTemplate,parsedD){
    var template = swig.compileFile(snipTemplate);
    var head = template({ css: parsedD.snippetCSS,
      scripts: parsedD.snippetJS});
    return head;
  };

  // builds the snippet html
  this.buildSnippet = function(name,parsedD){
    var jsFile = join(self.opts.snippetFolder,name+".js");
    var tomlFile = join(self.opts.snippetFolder,name+".toml");

    var buffer = "";

    if (fs.existsSync(tomlFile)) {
      this.addToml(tomlFile, parsedD);
    }

    if (fs.existsSync(jsFile)) {
      var htmlFile = join(self.opts.snippetFolder,name+".html");
      var htmlExists = fs.existsSync(path);
      if (htmlExists) {
        buffer += fs.readFileSync(htmlFile);
      } else{
        // insert auto div
        var divName = Math.random().toString(36).substring(7);
        buffer += "<div id='"+divName+"'>Error happened.</div>";
      }
      buffer += ("<script>");
      if( !htmlExists){
        buffer += "(function(){\n";
        buffer += "var yourDiv = document.getElementById('"+divName+"');\n";
      }
      buffer += fs.readFileSync(jsFile,'utf8');
      if( !htmlExists){
        buffer += "})();";
      }
      buffer += "</script>";
    }else{
      buffer += "Please make sure you add .html and .js for " + name;
    }
    return buffer;
  };
}
