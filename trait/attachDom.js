define(['jquery'], function($) {
  'use strict';

  var _attachTextLike = function(type, key, $field) {
    var inputSelector = 'input[type=' + type + ']',
        model;

    $field = $field.is(inputSelector) ?
      $field :
      $field.find(inputSelector);

    model = this.on(key, function(value) {
      $field.val(value);
    });

    $field.on('change', function(e) {
      model.set(key, e.target.value);
    });
  };

  // Two-way binding of inputs to a model
  return {
    attachCheckbox: function(key, $context) {
      var $checkboxes = $context.find('input[type=checkbox]'),
      model = this.on(key, function(piped) {
        var values = piped.split('|');

        $checkboxes.each(function(index, el) {
          var checked = !!~values.indexOf(el.value);
          el.checked = checked;
        });
      });

      $context.on('change', 'input[type=checkbox]', function() {
        var piped = $checkboxes
        .filter(':checked').toArray()
        .map(function(el) {
          return el.value;
        })
        .join('|');

        model.set(key, piped);
      });

      return this;
    },

    attachRadio: function(key, $context) {
      var $radios = $context.find('input[type=radio]'),
      model = this.on(key, function(value) {
        $radios.filter('[value="'+value+'"]').prop('checked', true);
      });

      $context.on('change', 'input[type=radio]', function() {
        model.set(key, this.value);
      });

      return this;
    },

    attachSelect: function(key, $field) {
      $field = $field.is('select') ?
        $field :
        $field.find('select');

      var model = this.on(key, function(value) {
        $field.val(value);
      });

      $field.on('change', function() {
        model.set(key, this.value);
      });

      return this;
    },

    attachText: function(key, $field) {
      _attachTextLike.call(this, 'text', key, $field);
      return this;
    },

    attachSearch: function(key, $field) {
      _attachTextLike.call(this, 'search', key, $field);
      return this;
    },

    attachEmail: function(key, $field) {
      _attachTextLike.call(this, 'email', key, $field);
      return this;
    },

    attachUrl: function(key, $field) {
      _attachTextLike.call(this, 'url', key, $field);
      return this;
    },

    attachTel: function(key, $field) {
      _attachTextLike.call(this, 'tel', key, $field);
      return this;
    },

    attachPassword: function(key, $field) {
      _attachTextLike.call(this, 'password', key, $field);
      return this;
    }
  };
});
