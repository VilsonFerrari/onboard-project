define([
    'underscore',
    'backbone',
    '../Model/GameModel'
], function(_, Backbone, Model) {
    var GameList = Backbone.Collection.extend({
        model: Model,
        initialize: function(models, options) {
            var baseUrl = 'https://api.rawg.io/api/games?platforms=18&dates=1990-01-01,2020-09-01';

            if(options.type && options.value) {
                switch(options.type) { 
                    case 'GENRES':
                        this.url = baseUrl + '&ordering=-released&genres=' + options.value;
                        break;
                    case 'URL':
                        this.url = options.value;
                        break;
                    case 'SEARCH':
                        this.url = baseUrl;

                        if(options && options.value && options.value.length >= 3) {
                            this.url += '&search=' + options.value;
                        }

                        break;
                    
                    default:
                        this.url = baseUrl + '&ordering=-released';
                        break;
                }
            } else {
                this.url = baseUrl + '&ordering=-released'; 
            }
        },
        parse: function(response) {
            var self = this;
            this.response = response;

            _.each(response.results, function(item, index) {
                var model = new self.model();

                model.set('id', item.id);
                model.set('name', item.name);
                model.set('released', new Date(item.released));
                model.set('image', item.background_image);
                model.set('rating', item.rating);
                model.set('metacritic', item?.metacritic ?? 0);

                // TODO: Check genres
                // TODO: Check short_screenshots
                // TODO: Check clip

                self.push(model)
            });

            return this.models;
        },
        nextPage: function() {
            return this.response ? this.response.next : null;
        },
        previousPage: function() {
            return this.response ? this.response.previous : null;
        },
        totalResults: function() {
            return this.response ? this.response.count : null;
        }
    });

    return GameList;
});