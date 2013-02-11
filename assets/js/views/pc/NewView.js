define([
  'underscore',
  'backbone',
  'jst/pc'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      _.bindAll(this);
      this.listenTo(this.model, 'invalid', this.renderValidationMessage);
    },
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['pc/new']({source: this.presenter()}));
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
      var self = this;
      this.$('.alert').hide();
      this.model.save(this.getValues(), {
        wait: true,
        success: function () {
          self.model.collection.add(self.model);
          self.trigger('created');
        }
      });
    },
    // Helper methods
    // --------------
    presenter: function () {
      return this.model.toSafeJSON();
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
