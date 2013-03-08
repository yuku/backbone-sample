define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["mobile/_form"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div data-role="fieldcontain">\n<label for="contact_name">Name:</label>\n<input type="text" name="name" id="contact_name"\nvalue="' +
((__t = ( source.name || '' )) == null ? '' : __t) +
'" />\n<div class="error" id="error_name"></div>\n</div>\n<div data-role="fieldcontain">\n<label for="contact_phone">Phone:</label>\n<input type="text" name="phone" id="contact_phone"\nvalue="' +
((__t = ( source.phone || '' )) == null ? '' : __t) +
'" />\n<div class="error" id="error_phone"></div>\n</div>\n<div data-role="fieldcontain">\n<label for="contact_email">Email:</label>\n<input type="text" name="email" id="contact_email"\nvalue="' +
((__t = ( source.email || '' )) == null ? '' : __t) +
'" />\n<div class="error" id="error_email"></div>\n</div>\n<div data-role="fieldcontain">\n<label for="contact_twitter">Twitter:</label>\n<input type="text" name="twitter" id="contact_twitter"\nvalue="' +
((__t = ( source.twitter || '' )) == null ? '' : __t) +
'" />\n<div class="error" id="error_twitter"></div>\n</div>\n<div data-role="fieldcontain">\n<label for="contact_facebook">Github:</label>\n<input type="text" name="github" id="contact_github"\nvalue="' +
((__t = ( source.github || '' )) == null ? '' : __t) +
'" />\n<div class="error" id="error_github"></div>\n</div>\n<div data-role="fieldcontain">\n<label for="contact_facebook">Facebook:</label>\n<input type="text" name="facebook" id="contact_facebook"\nvalue="' +
((__t = ( source.facebook || '' )) == null ? '' : __t) +
'" />\n<div class="error" id="error_facebook"></div>\n</div>';

}
return __p
};

this["JST"]["mobile/divider"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li data-role="list-divider">\n' +
((__t = ( index )) == null ? '' : __t) +
'\n</li>';

}
return __p
};

this["JST"]["mobile/edit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div data-role="header">\n<h1>Edit</h1>\n</div>\n<div data-role="content">\n<form action="#" method="POST">\n' +
((__t = ( JST['mobile/_form']({source: source}) )) == null ? '' : __t) +
'\n<div class="ui-body ui-body-c">\n<fieldset class="ui-grid-a">\n<div class="ui-block-a">\n<a href="#' +
((__t = ( source.id )) == null ? '' : __t) +
'" data-role="button" data-theme="c">Cancel</a>\n</div>\n<div class="ui-block-b">\n<button class="save" data-theme="b">Save</button>\n</div>\n</fieldset>\n<hr/>\n<span data-role="button" class="delete" data-theme="d">Delete</span>\n</div>\n</form>\n</div>';

}
return __p
};

this["JST"]["mobile/index"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div data-role="header">\n<h1>All Contacts</h1>\n<a href="#new" class="ui-btn-right">New</a>\n</div>\n<div data-role="content">\n</div>';

}
return __p
};

this["JST"]["mobile/item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<a href="#' +
((__t = ( source.id )) == null ? '' : __t) +
'">\n<img src="http://www.gravatar.com/avatar/' +
((__t = ( source.hash )) == null ? '' : __t) +
'"/>\n<h3 class="contact-name">' +
((__t = ( source.name )) == null ? '' : __t) +
'</h3>\n';
 if (source.phone) { ;
__p += '<p>Phone: ' +
((__t = ( source.phone )) == null ? '' : __t) +
'</p>';
 } ;
__p += '\n';
 if (source.email) { ;
__p += '<p>Email: ' +
((__t = ( source.email )) == null ? '' : __t) +
'</p>';
 } ;
__p += '\n</a>';

}
return __p
};

this["JST"]["mobile/new"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div data-role="header">\n<h1>New</h1>\n</div>\n<div data-role="content">\n<form action="#" method="POST">\n' +
((__t = ( JST['mobile/_form']({source: source}) )) == null ? '' : __t) +
'\n<div class="ui-body ui-body-c">\n<fieldset class="ui-grid-a">\n<div class="ui-block-a">\n<a href="#" data-role="button" data-theme="c">Cancel</a>\n</div>\n<div class="ui-block-b">\n<button class="save" data-theme="b">Save</button>\n</div>\n</fieldset>\n</div>\n</form>\n</div>';

}
return __p
};

this["JST"]["mobile/show"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div data-role="header">\n<a href="#" data-icon="back" class="back ui-btn-left">All Contacts</a>\n<h1>Info</h1>\n<a href="#' +
((__t = ( source.id )) == null ? '' : __t) +
'/edit" class="edit ui-btn-right">Edit</a>\n</div>\n<div data-role="content">\n<div class="contact-head">\n<div class="avatar">\n<img src="http://www.gravatar.com/avatar/' +
((__t = ( source.hash )) == null ? '' : __t) +
'"/>\n</div>\n<div class="name">\n<h3 data-name="name">' +
((__t = ( source.name )) == null ? '' : __t) +
'</h3>\n</div>\n</div>\n<ul data-role="listview" data-inset="true">\n';
 if (source.phone) { ;
__p += '\n<li data-icon="false">\n<a href="tel:' +
((__t = ( source.phone )) == null ? '' : __t) +
'">\n<dl>\n<dt>Phone</dt>\n<dd>' +
((__t = ( source.phone || '' )) == null ? '' : __t) +
'</dd>\n</dl>\n</a>\n</li>\n';
 } ;
__p += '\n';
 if (source.email) { ;
__p += '\n<li data-icon="false" data-name="email">\n<a href="mailto:' +
((__t = ( source.email )) == null ? '' : __t) +
'">\n<dl>\n<dt>Email</dt>\n<dd>' +
((__t = ( source.email  || '' )) == null ? '' : __t) +
'</dd>\n</dl>\n</a>\n</li>\n';
 } ;
__p += '\n';
 if (source.twitter) { ;
__p += '\n<li data-icon="false" data-name="twitter">\n<a href="https://twitter.com/' +
((__t = ( source.twitter )) == null ? '' : __t) +
'" target="_blank">\n<dl>\n<dt>Twitter</dt>\n<dd>' +
((__t = ( source.twitter )) == null ? '' : __t) +
'</dd>\n</dl>\n</a>\n</li>\n';
 } ;
__p += '\n';
 if (source.github) { ;
__p += '\n<li data-icon="false" data-name="github">\n<a href="https://github.com/' +
((__t = ( source.github )) == null ? '' : __t) +
'" target="_blank">\n<dl>\n<dt>GitHub</dt>\n<dd>' +
((__t = ( source.github )) == null ? '' : __t) +
'</dd>\n</dl>\n</a>\n</li>\n';
 } ;
__p += '\n';
 if (source.facebook) { ;
__p += '\n<li data-icon="false" data-name="facebook">\n<a href="https://www.facebook.com/' +
((__t = ( source.facebook )) == null ? '' : __t) +
'" target="_blank">\n<dl>\n<dt>Facebook</dt>\n<dd>' +
((__t = ( source.facebook )) == null ? '' : __t) +
'</dd>\n</dl>\n</a>\n</li>\n';
 } ;
__p += '\n</ul>\n</div>';

}
return __p
};

  return this["JST"];

});