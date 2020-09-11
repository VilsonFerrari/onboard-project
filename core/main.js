define([
    'tpl!../templates/MainTemplate.tpl',
    'Views/HeaderView',
    'Views/GenreListView',
    'Views/GameListView',
], function(MainTpl, HeaderView, GenreListView, GameListView) {
    new (Backbone.View.extend({
        el: $('#main'),
        initialize: function(options) {
            this.headerView = options.headerView;
            this.genreListView = options.genreListView;
            this.gameListView = options.gameListView;
            this.render();
        },
        render: function() {
            this.$el.html(MainTpl);

            var GameListView = new(this.gameListView)({
                el: $('#my-games-content')
            });

            new(this.genreListView)({
                el: $('#genres-content'),
                gamelist: GameListView
            });

            new(this.headerView)({
                el: $('#my-header'),
                gamelist: GameListView
            });
        }
    }))({
        headerView: HeaderView,
        genreListView: GenreListView,
        gameListView: GameListView,
    });

    return this;
})