define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["pc/_form"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<form class="form-horizontal">\n<div class="alert alert-error alert-block" style="display: none;">\n<ul>\n</ul>\n</div>\n<div class="control-group">\n<label class="control-label" for="name">Name</label>\n<div class="controls">\n<input type="text" id="name" name="name"\nvalue="' +
((__t = ( source.name || '' )) == null ? '' : __t) +
'" placeholder="Name" required/>\n</div>\n</div>\n<div class="control-group">\n<label class="control-label" for="email">Email</label>\n<div class="controls">\n<input type="text" id="email" name="email"\nvalue="' +
((__t = ( source.email || '' )) == null ? '' : __t) +
'" placeholder="Email"\npattern="[^\\s@]+@\\S+\\.\\S+"/>\n</div>\n</div>\n<div class="control-group">\n<label class="control-label" for="phone">Phone</label>\n<div class="controls">\n<input type="text" id="phone" name="phone"\nvalue="' +
((__t = ( source.phone || '' )) == null ? '' : __t) +
'" placeholder="Phone"/>\n</div>\n</div>\n<div class="control-group">\n<label class="control-label" for="facebook">Facebook</label>\n<div class="controls">\n<input type="text" id="facebook" name="facebook"\nvalue="' +
((__t = ( source.facebook || '' )) == null ? '' : __t) +
'" placeholder="Facebook"/>\n</div>\n</div>\n<div class="control-group">\n<label class="control-label" for="twitter">Twitter</label>\n<div class="controls">\n<input type="text" id="twitter" name="twitter"\nvalue="' +
((__t = ( source.twitter || '' )) == null ? '' : __t) +
'" placeholder="Twitter"/>\n</div>\n</div>\n<div class="control-group">\n<label class="control-label" for="github">GitHub</label>\n<div class="controls">\n<input type="text" id="github" name="github"\nvalue="' +
((__t = ( source.github || '' )) == null ? '' : __t) +
'" placeholder="GitHub"/>\n</div>\n</div>\n<div class="form-actions">\n<button class="btn btn-primary submit">Submit</button>\n<a href="#' +
((__t = ( source.id )) == null ? '' : __t) +
'" class="btn cancel">Cancel</a>\n';
 if (source.id) { ;
__p += '\n<span class="btn btn-danger delete">Delete</span>\n';
 } ;
__p += '\n</div>\n</form>';

}
return __p
};

this["JST"]["pc/app"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="header">\n<h1>Contacts</h1>\n</div>\n<div id="content">\n<div id="sidebar" class="clearfix">\n<div id="sidebar-header">\n<a href="#new" class="new">New Contact</a>\n</div>\n<div id="sidebar-content">\n<div id="contactlist">\n</div>\n</div>\n</div>\n<div id="main">\n</div>\n</div>';

}
return __p
};

this["JST"]["pc/edit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( JST['pc/_form']({source: source}) )) == null ? '' : __t);

}
return __p
};

this["JST"]["pc/item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<a href="#' +
((__t = ( source.id )) == null ? '' : __t) +
'">\n<img src="http://www.gravatar.com/avatar/' +
((__t = ( source.hash )) == null ? '' : __t) +
'"\nclass="thumbnail"/>\n<h3>' +
((__t = ( source.name )) == null ? '' : __t) +
'</h3>\n';
 if (source.email) { ;
__p += '<p>' +
((__t = ( source.email )) == null ? '' : __t) +
'</p>';
 } ;
__p += '\n';
 if (source.phone) { ;
__p += '<p>' +
((__t = ( source.phone )) == null ? '' : __t) +
'</p>';
 } ;
__p += '\n</a>';

}
return __p
};

this["JST"]["pc/new"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( JST['pc/_form']({source: source}) )) == null ? '' : __t);

}
return __p
};

this["JST"]["pc/show"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="pager">\n<li class="previous"><a href="#' +
((__t = ( source.id )) == null ? '' : __t) +
'/edit" class="edit">Edit</a></li>\n</ul>\n<dl class="dl-horizontal">\n<dt>Name</dt>\n<dd>' +
((__t = ( source.name )) == null ? '' : __t) +
'</dd>\n<dt>Email</dt>\n<dd>' +
((__t = ( source.email || '&nbsp;' )) == null ? '' : __t) +
'</dd>\n<dt>Phone</dt>\n<dd>' +
((__t = ( source.phone || '&nbsp;' )) == null ? '' : __t) +
'</dd>\n';
 if (source.facebook) { ;
__p += '\n<dt>Facebook</dt>\n<dd>\n<a href="https://www.facebook.com/' +
((__t = ( source.facebook )) == null ? '' : __t) +
'"\ntarget="_blank">\n' +
((__t = ( source.facebook )) == null ? '' : __t) +
'\n</a>\n</dd>\n';
 } ;
__p += '\n';
 if (source.twitter) { ;
__p += '\n<dt>Twitter</dt>\n<dd>\n<a href="https://twitter.com/' +
((__t = ( source.twitter )) == null ? '' : __t) +
'" target="_blank">\n' +
((__t = ( source.twitter )) == null ? '' : __t) +
'\n</a>\n</dd>\n';
 } ;
__p += '\n';
 if (source.github) { ;
__p += '\n<dt>Github</dt>\n<dd>\n<a href="https://github.com/' +
((__t = ( source.github )) == null ? '' : __t) +
'" target="_blank">\n' +
((__t = ( source.github )) == null ? '' : __t) +
'\n</a>\n</dd>\n';
 } ;
__p += '\n</dl>';

}
return __p
};

  return this["JST"];

});