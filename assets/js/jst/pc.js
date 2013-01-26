this["JST"] = this["JST"] || {};

this["JST"]["pc/_form"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<form class="form-horizontal">\n  <div class="alert alert-error alert-block" style="display: none;">\n    <ul>\n    </ul>\n  </div>\n  <div class="control-group">\n    <label class="control-label" for="name">Name</label>\n    <div class="controls">\n      <input type="text" id="name" name="name"\n        value="'+
( source.name || '' )+
'" placeholder="Name" required/>\n    </div>\n  </div>\n  <div class="control-group">\n    <label class="control-label" for="email">Email</label>\n    <div class="controls">\n      <input type="text" id="email" name="email"\n        value="'+
( source.email || '' )+
'" placeholder="Email"\n        pattern="[^\\s@]+@\\S+\\.\\S+"/>\n    </div>\n  </div>\n  <div class="control-group">\n    <label class="control-label" for="phone">Phone</label>\n    <div class="controls">\n      <input type="text" id="phone" name="phone"\n        value="'+
( source.phone || '' )+
'" placeholder="Phone"/>\n    </div>\n  </div>\n  <div class="control-group">\n    <label class="control-label" for="facebook">Facebook</label>\n    <div class="controls">\n      <input type="text" id="facebook" name="facebook"\n        value="'+
( source.facebook || '' )+
'" placeholder="Facebook"/>\n    </div>\n  </div>\n  <div class="control-group">\n    <label class="control-label" for="twitter">Twitter</label>\n    <div class="controls">\n      <input type="text" id="twitter" name="twitter"\n        value="'+
( source.twitter || '' )+
'" placeholder="Twitter"/>\n    </div>\n  </div>\n  <div class="control-group">\n    <label class="control-label" for="github">GitHub</label>\n    <div class="controls">\n      <input type="text" id="github" name="github"\n        value="'+
( source.github || '' )+
'" placeholder="GitHub"/>\n    </div>\n  </div>\n  <div class="form-actions">\n    <button class="btn btn-primary submit">Submit</button>\n    <a href="#'+
( source.id )+
'" class="btn cancel">Cancel</a>\n    ';
 if (source.id) { 
;__p+='\n      <span class="btn btn-danger delete">Delete</span>\n    ';
 } 
;__p+='\n  </div>\n</form>\n';
}
return __p;
};

this["JST"]["pc/app"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="header">\n  <h1>Contacts</h1>\n</div>\n<div id="content">\n  <div id="sidebar" class="clearfix">\n    <div id="sidebar-header">\n      <a href="#new" class="new">New Contact</a>\n    </div>\n    <div id="sidebar-content">\n      <div id="contactlist">\n      </div>\n    </div>\n  </div>\n  <div id="main">\n  </div>\n</div>\n';
}
return __p;
};

this["JST"]["pc/edit"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=''+
( JST['pc/_form']({source: source}) )+
'\n';
}
return __p;
};

this["JST"]["pc/item"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#'+
( source.id )+
'">\n  <img src="http://www.gravatar.com/avatar/'+
( source.hash )+
'"\n    class="thumbnail"/>\n  <h3>'+
( source.name )+
'</h3>\n  ';
 if (source.email) { 
;__p+='<p>'+
( source.email )+
'</p>';
 } 
;__p+='\n  ';
 if (source.phone) { 
;__p+='<p>'+
( source.phone )+
'</p>';
 } 
;__p+='\n</a>\n';
}
return __p;
};

this["JST"]["pc/new"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=''+
( JST['pc/_form']({source: source}) )+
'\n';
}
return __p;
};

this["JST"]["pc/show"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="pager">\n  <li class="previous"><a href="#'+
( source.id )+
'/edit">Edit</a></li>\n</ul>\n<dl class="dl-horizontal">\n  <dt>Name</dt>\n  <dd>'+
( source.name )+
'</dd>\n  <dt>Email</dt>\n  <dd>'+
( source.email || '&nbsp;' )+
'</dd>\n  <dt>Phone</dt>\n  <dd>'+
( source.phone || '&nbsp;' )+
'</dd>\n  ';
 if (source.facebook) { 
;__p+='\n    <dt>Facebook</dt>\n    <dd>\n      <a href="https://www.facebook.com/'+
( source.facebook )+
'"\n          target="_blank">\n        '+
( source.facebook )+
'\n      </a>\n    </dd>\n  ';
 } 
;__p+='\n  ';
 if (source.twitter) { 
;__p+='\n    <dt>Twitter</dt>\n    <dd>\n      <a href="https://twitter.com/'+
( source.twitter )+
'" target="_blank">\n        '+
( source.twitter )+
'\n      </a>\n    </dd>\n  ';
 } 
;__p+='\n  ';
 if (source.github) { 
;__p+='\n    <dt>Github</dt>\n    <dd>\n      <a href="https://github.com/'+
( source.github )+
'" target="_blank">\n        '+
( source.github )+
'\n      </a>\n    </dd>\n  ';
 } 
;__p+='\n</dl>\n';
}
return __p;
};