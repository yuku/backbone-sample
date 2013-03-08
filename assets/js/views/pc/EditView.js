define([
  'underscore',
  'backbone',
  'jst/pc'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    events: {
      'click .delete': 'onClickDelete',
      'click .cancel': function (e) {
        e.preventDefault();
        Backbone.history.navigate(this.model.id, true);
      }
    },
    initialize: function () {
      _.bindAll(this);
      this.listenTo(this.model, 'invalid', this.renderValidationMessage);
      this.listenTo(this.model, 'sync', function (model) {
        model.collection.add(model);
        Backbone.history.navigate(model.id, true);
      });
      this.listenTo(this.model, 'destroy', function () {
        Backbone.history.navigate('', true);
      });
    },
    className: 'edit-view',
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['pc/edit']({source: this.presenter()}));
      // Since `submit` is undelegate-able in Internet Explorer, it is needed
      // to add event listener directrly to the form tag.
      this.$('form').on('submit', this.onSubmit);
      return this;
    },
    renderValidationMessage: function (model, errors) {
      var lis = _.map(errors, function (value, name) {
        return '<li><strong>' + name + '</strong> ' + value + '</li>';
      });
      this.$('.alert')
        .show()
        .find('ul').html(lis.join(''));
      return this;
    },
    // Controller methods
    // ------------------
    onSubmit: function (e) {
      e.preventDefault();
      var model = this.model;
      this.$('.alert').hide();
      model.save(this.getValues());
    },
    onClickDelete: function (e) {
      e.preventDefault();
      this.model.destroy();
    },
    // Helper methods
    // --------------
    presenter: function () {
      return this.model.toEscapedJSON();
    },
    getValues: function () {
      var values = {};
      _.each(this.$('form').serializeArray(), function (obj) {
        values[obj.name] = obj.value;
      });
      return values;
    }
  });
});
