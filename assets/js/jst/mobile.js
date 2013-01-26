this["JST"] = this["JST"] || {};

this["JST"]["_form"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div data-role="fieldcontain">\n  <label for="contact_name">Name:</label>\n  <input type="text" name="name" id="contact_name"\n    value="'+
( source.name || '' )+
'" />\n  <div class="error" id="error_name"></div>\n</div>\n<div data-role="fieldcontain">\n  <label for="contact_phone">Phone:</label>\n  <input type="text" name="phone" id="contact_phone"\n    value="'+
( source.phone || '' )+
'" />\n  <div class="error" id="error_phone"></div>\n</div>\n<div data-role="fieldcontain">\n  <label for="contact_email">Email:</label>\n  <input type="text" name="email" id="contact_email"\n    value="'+
( source.email || '' )+
'" />\n  <div class="error" id="error_email"></div>\n</div>\n<div data-role="fieldcontain">\n  <label for="contact_twitter">Twitter:</label>\n  <input type="text" name="twitter" id="contact_twitter"\n    value="'+
( source.twitter || '' )+
'" />\n  <div class="error" id="error_twitter"></div>\n</div>\n<div data-role="fieldcontain">\n  <label for="contact_facebook">Github:</label>\n  <input type="text" name="github" id="contact_github"\n    value="'+
( source.github || '' )+
'" />\n  <div class="error" id="error_github"></div>\n</div>\n<div data-role="fieldcontain">\n  <label for="contact_facebook">Facebook:</label>\n  <input type="text" name="facebook" id="contact_facebook"\n    value="'+
( source.facebook || '' )+
'" />\n  <div class="error" id="error_facebook"></div>\n</div>\n';
}
return __p;
};

this["JST"]["divider"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<li data-role="list-divider">\n  '+
( index )+
'\n</li>\n';
}
return __p;
};

this["JST"]["edit"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div data-role="header">\n  <h1>Edit</h1>\n</div>\n<div data-role="content">\n  <form action="#" method="POST">\n    '+
( JST['_form']({source: source}) )+
'\n    <div class="ui-body ui-body-c">\n      <fieldset class="ui-grid-a">\n        <div class="ui-block-a">\n          <a href="#'+
( source.id )+
'" data-role="button" data-theme="c">Cancel</a>\n        </div>\n        <div class="ui-block-b">\n          <button class="save" data-theme="b">Save</button>\n        </div>\n      </fieldset>\n      <hr/>\n      <span data-role="button" class="delete" data-theme="d">Delete</span>\n    </div>\n  </form>\n</div>\n';
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

this["JST"]["new"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div data-role="header">\n  <h1>New</h1>\n</div>\n<div data-role="content">\n  <form action="#" method="POST">\n    '+
( JST['_form']({source: source}) )+
'\n    <div class="ui-body ui-body-c">\n      <fieldset class="ui-grid-a">\n        <div class="ui-block-a">\n          <a href="#" data-role="button" data-theme="c">Cancel</a>\n        </div>\n        <div class="ui-block-b">\n          <button class="save" data-theme="b">Save</button>\n        </div>\n      </fieldset>\n    </div>\n  </form>\n</div>\n';
}
return __p;
};

this["JST"]["show"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div data-role="header">\n  <a href="#" data-icon="back" class="back ui-btn-left">All Contacts</a>\n  <h1>Info</h1>\n  <a href="#'+
( source.id )+
'/edit" class="edit ui-btn-right">Edit</a>\n</div>\n<div data-role="content">\n  <div class="contact-head">\n    <div class="avatar">\n      <img src="http://www.gravatar.com/avatar/'+
( source.hash )+
'"/>\n    </div>\n    <div class="name">\n      <h3 data-name="name">'+
( source.name )+
'</h3>\n    </div>\n  </div>\n  <ul data-role="listview" data-inset="true">\n    ';
 if (source.phone) { 
;__p+='\n      <li data-icon="false">\n        <a href="tel:'+
( source.phone )+
'">\n          <dl>\n            <dt>Phone</dt>\n            <dd>'+
( source.phone || '' )+
'</dd>\n          </dl>\n        </a>\n      </li>\n    ';
 } 
;__p+='\n    ';
 if (source.email) { 
;__p+='\n      <li data-icon="false" data-name="email">\n        <a href="mailto:'+
( source.email )+
'">\n          <dl>\n            <dt>Email</dt>\n            <dd>'+
( source.email  || '' )+
'</dd>\n          </dl>\n        </a>\n      </li>\n    ';
 } 
;__p+='\n    ';
 if (source.twitter) { 
;__p+='\n      <li data-icon="false" data-name="twitter">\n        <a href="https://twitter.com/'+
( source.twitter )+
'" target="_blank">\n          <dl>\n            <dt>Twitter</dt>\n            <dd>'+
( source.twitter )+
'</dd>\n          </dl>\n        </a>\n      </li>\n    ';
 } 
;__p+='\n    ';
 if (source.github) { 
;__p+='\n      <li data-icon="false" data-name="github">\n        <a href="https://github.com/'+
( source.github )+
'" target="_blank">\n          <dl>\n            <dt>GitHub</dt>\n            <dd>'+
( source.github )+
'</dd>\n          </dl>\n        </a>\n      </li>\n    ';
 } 
;__p+='\n    ';
 if (source.facebook) { 
;__p+='\n      <li data-icon="false" data-name="facebook">\n        <a href="https://www.facebook.com/'+
( source.facebook )+
'" target="_blank">\n          <dl>\n            <dt>Facebook</dt>\n            <dd>'+
( source.facebook )+
'</dd>\n          </dl>\n        </a>\n      </li>\n    ';
 } 
;__p+='\n  </ul>\n</div>\n';
}
return __p;
};