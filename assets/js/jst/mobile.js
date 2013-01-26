this["JST"] = this["JST"] || {};

this["JST"]["divider"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<li data-role="list-divider">\n  '+
( index )+
'\n</li>\n';
}
return __p;
};

this["JST"]["index"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div data-role="header">\n  <h1>All Contacts</h1>\n  <a href="#new" class="ui-btn-right">New</a>\n</div>\n<div data-role="content">\n</div>\n';
}
return __p;
};

this["JST"]["item"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#'+
( source.id )+
'">\n  <img src="http://www.gravatar.com/avatar/'+
( source.hash )+
'"/>\n  <h3 class="contact-name">'+
( source.name )+
'</h3>\n  ';
 if (source.phone) { 
;__p+='<p>Phone: '+
( source.phone )+
'</p>';
 } 
;__p+='\n  ';
 if (source.email) { 
;__p+='<p>Email: '+
( source.email )+
'</p>';
 } 
;__p+='\n</a>\n';
}
return __p;
};