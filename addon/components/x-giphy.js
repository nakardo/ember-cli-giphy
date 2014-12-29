import Ember from 'ember';

var host = '//api.giphy.com/v1/gifs/',
    key = 'dc6zaTOxFJmzC';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['key', 'term', 'src', 'gifId', 'translate', 'random'],

  setupXGiphy: function() {
    if (this.get('key') === undefined) {
      this.set('key', key);
    }

    if (this.get('gifId')) {
      return this.gifById();
    }

    return this.termChanged();
  }.on('didInsertElement'),

  request: function() {
    var that = this;
    Ember.$.getJSON(this.get('url'), this.get('params'))
      .then(function(response) {
        that.set('response', response);
      });
  },

  gifIdChanged: function() {
    this.gifById();
  }.observes('gifId'),

  termChanged: function() {
    var term = this.get('term');
    if (term) {
      this.set('queryTerm', this.encodeTerm(term));
      if (this.get('random')) {
        return this.gifByRandom();
      }
      if (this.get('translate')) {
        return this.gifByTranslate();
      }

      return this.gifByTerm();
    }
  }.observes('term'),

  responseChanged: function() {
    var response = this.get('response');
    if (response) {
      if (this.get('random')) {
        return this.set('src', response.data.image_original_url);
      }

      if (this.get('translate') || this.get('gifId')) {
        return this.set('src', response.data.images.original.url);
      }

      return this.set('src', response.data[0].images.original.url);
    }
  }.observes('response'),

  encodeTerm: function(term) {
    return term.replace(/ /g, '+');
  },

  gifByTerm: function() {
    this.set('url', host + 'search');
    this.set('params', { q: this.get('queryTerm'), api_key: this.get('key') });
    this.request();
  },

  gifByRandom: function() {
    this.set('url', host + 'random');
    this.set('params', {
      tag: this.get('queryTerm'), api_key: this.get('key')
    });
    this.request();
  },

  gifByTranslate: function() {
    this.set('url', host + 'translate');
    this.set('params', { s: this.get('queryTerm'), api_key: this.get('key') });
    this.request();
  },

  gifById: function() {
    this.set('url', host + this.get('gifId'));
    this.set('params', { api_key: this.get('key') });
    this.request();
  }
});
