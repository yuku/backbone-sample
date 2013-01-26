define([
  'backbone'
],
function (Backbone) {

  'use strict';

  return Backbone.View.extend({
    constructor: function () {
      // default options
      this.options = _.extend({
        changeHash: false,
        role: 'page',
        dataUrl: location.pathname
      }, this.options);
      // default attributes
      this.attributes = _.extend({
        'data-role': 'page'
      }, this.attributes);
      Backbone.View.apply(this, arguments);
    },
    show: function (options) {
      options || (options = {});
      _.defaults(options, this.options);
      this.render().$el.appendTo($('body'));
      if (options.firstpage) {
        options.transition || (options.transition = 'none');
        // jQuery Mobile は最初のページが挿入されると自動的に初期化を行う。
        // 初期化完了時に呼ばれる pagecreate イベントが発生するまで
        // ページを表示行できない。
        this.$el.on('pagecreate', function () {
          $.mobile.changePage($(this), options);
        });
      } else {
        //if (event instanceof PopStateEvent && options.reverse == null) {
        //  // {pushState: true} で戻るボタンが押された時
        //  options.reverse = true;
        //}
        $.mobile.changePage(this.$el, options);
      }
    }
  });
});
