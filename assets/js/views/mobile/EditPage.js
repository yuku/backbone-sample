define([
  'underscore',
  './Page',
  'jst/mobile'
],
function (_, Page, JST) {

  'use strict';

  return Page.extend({
    events: {
      'pagehide': 'remove',
      'click .delete': 'onClickDelete'
    },
    options: {
      transition: 'pop'
    },
    initialize: function () {
      _.bindAll(this, 'onSubmit');
      this.listenTo(this.model, 'invalid', this.renderValidationMessage);
    },
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['mobile/edit']({source: this.presenter()}));
      // Since `submit` is undelegate-able in Internet Explorer, it is needed
      // to add event listener directrly to the form tag.
      this.$('form').on('submit', this.onSubmit);
      return this;
    },
    renderValidationMessage: function (model, errors) {
      _.each(errors, function (value, name) {
        this.$("#error_" + name)
          .addClass("active")
          .text(value);
      }, this);
      return this;
    },
    // Controller methods
    // ------------------
    onSubmit: function (e) {
      e.preventDefault();
      var self = this;
      this.$('.error.active').removeClass('active');
      this.model.save(this.getValues(), {
        wait: true,
        success: function () {
          self.model.collection.add(self.model);
          self.trigger('updated');
        }
      });
    },
    onClickDelete: function (e) {
      e.preventDefault();
      this.model.destroy();
      this.trigger('deleted');
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
