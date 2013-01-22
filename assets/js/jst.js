define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["pc/app"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="sidebar">\n  <div id="contactlist">\n  </div>\n</div>\n<div id="main">\n</div>\n';
}
return __p;
};

this["JST"]["pc/item"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#'+
( id )+
'">\n  '+
( name )+
'\n  '+
( email )+
'\n</a>\n';
}
return __p;
};

this["JST"]["pc/show"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=''+
( name )+
'\n'+
( email )+
'\n';
 if (phone) { 
;__p+='\n  '+
( phone )+
'\n';
 } 
;__p+='\n';
}
return __p;
};

  return this["JST"];
});