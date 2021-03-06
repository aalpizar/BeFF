define([
  'trait/attachDom',
  'nbd/Model'
], function(attachDom, Model) {
  'use strict';

  describe('trait/attachDom', function() {
    var model;

    beforeEach(function() {
      model = new Model();
      spyOn(model, 'get');
      spyOn(model, 'set');
    });

    afterEach(function() {
      model.destroy();
    });

    describe('attachCheckbox', function() {
      var $context;

      beforeEach(function() {
        $context = $([
          '<div>',
          '<input type="checkbox" value="bar">',
          '<input type="checkbox" value="baz">',
          '</div>'
        ].join('')).appendTo(document.body);
      });

      afterEach(function() {
        $context.remove();
      });

      it('sets model with piped dom values', function(done) {
        attachDom.attachCheckbox.call(model, 'foo', $context);
        $context.find('input:first').click();

        setTimeout(function() {
          expect(model.set).toHaveBeenCalledWith('foo', 'bar');
          $context.find('input:last').click();
        }, 100);

        setTimeout(function() {
          expect(model.set).toHaveBeenCalledWith('foo', 'bar|baz');
          done();
        }, 100);
      });

      it('changes based on model', function(done) {
        attachDom.attachCheckbox.call(model, 'foo', $context);
        model.trigger('foo', 'baz');
        setTimeout(function() {
          expect($context.find('input:first')[0].checked).toBe(false);
          expect($context.find('input:last')[0].checked).toBe(true);
          done();
        }, 100);
      });
    });

    describe('attachRadio', function() {
      var $context;

      beforeEach(function() {
        $context = $([
          '<div>',
          '<input type="radio" name="foo" value="bar">',
          '<input type="radio" name="foo" value="baz">',
          '</div>'
        ].join('')).appendTo(document.body);
      });

      afterEach(function() {
        $context.remove();
      });

      it('sets model to dom values', function(done) {
        attachDom.attachRadio.call(model, 'foo', $context);
        $context.find('input:first').click();

        setTimeout(function() {
          expect(model.set).toHaveBeenCalledWith('foo', 'bar');
          $context.find('input:last').click();
        }, 100);

        setTimeout(function() {
          expect(model.set).toHaveBeenCalledWith('foo', 'baz');
          done();
        }, 100);
      });

      it('changes based on model', function(done) {
        attachDom.attachRadio.call(model, 'foo', $context);
        model.trigger('foo', 'baz');

        setTimeout(function() {
          expect($context.find('input:first')[0].checked).toBe(false);
          expect($context.find('input:last')[0].checked).toBe(true);
          done();
        }, 100);
      });
    });

    describe('attachSelect', function() {
      var $context;

      beforeEach(function() {
        $context = $([
          '<select>',
          '<option value="bar">',
          '<option value="baz">',
          '</select>',
        ].join('')).appendTo(document.body);
      });

      afterEach(function() {
        $context.remove();
      });

      it('sets model with dom values', function(done) {
        attachDom.attachSelect.call(model, 'foo', $context);
        $context.find('option:first').prop('selected', true).change();

        setTimeout(function() {
          expect(model.set).toHaveBeenCalledWith('foo', 'bar');
          $context.find('option:last').prop('selected', true).change();
        }, 100);

        setTimeout(function() {
          expect(model.set).toHaveBeenCalledWith('foo', 'baz');
          done();
        }, 100);
      });

      it('changes based on model', function(done) {
        attachDom.attachSelect.call(model, 'foo', $context);
        model.trigger('foo', 'baz');

        setTimeout(function() {
          expect($context.val()).toBe('baz');
          done();
        }, 100);
      });
    });

    describe('attachText', function() {
      var $context;

      beforeEach(function() {
        $context = $('<input type="text">').appendTo(document.body);
      });

      afterEach(function() {
        $context.remove();
      });

      it('sets model with dom values', function(done) {
        attachDom.attachText.call(model, 'foo', $context);
        $context.val('bar').change();

        setTimeout(function() {
          expect(model.set).toHaveBeenCalledWith('foo', 'bar');
          done();
        }, 100);
      });

      it('changes based on model', function(done) {
        attachDom.attachText.call(model, 'foo', $context);
        model.trigger('foo', 'baz');

        setTimeout(function() {
          expect($context.val()).toBe('baz');
          done();
        }, 100);
      });
    });
  });
});
