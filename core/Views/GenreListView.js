define([
    'underscore',
    'jquery',
    'backbone',
    '../Collection/GenreList',
    'tpl!../../templates/GenreListTemplate.tpl',
], function(_, $, Backbone, GenreList, GenreListTpl) {
    return Backbone.View.extend({
        genres: [],
        initialize: function(options) {
            this.gamelist = options.gamelist

            this.genreList = new GenreList();
            this.genreList.fetch();

            this.listenTo(this.genreList, 'add', function(e) {
                this.genres.push(e.attributes);
                this.render();
            });

            this.render();
        },
        events: {
            "click fe-genre-item": 'clicked',
        },
        clicked: function(e) {
            var genreId = $(e.currentTarget).data('id');
            window.dispatchEvent(new CustomEvent('GenreList:select', { detail: { id: genreId } }))
            this.gamelist.fetchGames('GENRES', genreId);
        },
        render: function() {
            this.$el.html(GenreListTpl({ genres: this.genres }));
            return this;
        }, 
    });
});