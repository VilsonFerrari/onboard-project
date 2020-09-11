define([
    'underscore',
    'backbone',
    '../Model/GenreModel'
], function(_, Backbone, Model) {
    var GenreList = Backbone.Collection.extend({
        model: Model,
        url: 'https://api.rawg.io/api/genres?ordering=name',
        parse: function(response) {
            var self = this;
            this.response = response;

            _.each(response.results, function(item, index) {
                var model = new self.model();

                model.set('id', item.id);
                model.set('name', item.name);
                model.set('slug', item.slug);

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

    return GenreList;
});