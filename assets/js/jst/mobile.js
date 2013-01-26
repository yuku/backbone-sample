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
'\n    <div class="ui-body ui-body-b">\n      <fieldset class="ui-grid-a">\n        <div class="ui-block-a">\n          <a href="#" data-role="button" data-theme="d">Cancel</a>\n        </div>\n        <div class="ui-block-b">\n          <button class="save" data-theme="a">Save</button>\n        </div>\n      </fieldset>\n    </div>\n  </form>\n</div>\n';
}
return __p;
};