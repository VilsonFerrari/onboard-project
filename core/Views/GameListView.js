define([
    'underscore',
    'backbone',
    'jquery',
    '../Collection/GameList',
    './GameCardView',
    'tpl!../../templates/GameListTemplate.tpl',
], function(_, Backbone, $, GameList, GameCardView, GameListTpl) {
    return Backbone.View.extend({
        games: [],
        isFetching: false,
        initialize: function() {
            this.fetchGames();
            this.render();

            _.bindAll(this, 'fetchGames');
            this.fetchGames = _.debounce(this.fetchGames, 300);

            _.bindAll(this, 'scrollCheck');
            this.scrollCheck = _.debounce(this.scrollCheck, 0);
            $(window).scroll(this.scrollCheck);  
        },
        scrollCheck: function() {
            var scrollHeight = document.body.scrollHeight;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var innerHeight = window.innerHeight;

            var scrollHitPageBottom = scrollHeight <= scrollTop + (3 * innerHeight);
            if (scrollHitPageBottom && !this.isFetching && this.gamesList.nextPage()) {
                this.isFetching = true;
                this.fetchGames('URL', this.gamesList.nextPage());
            }
        },
        fetchGames: function(type, value) {
            var options = {
                type: type,
                value: value
            };

            if(type != 'URL') {
                this.games = [];
            }

            this.gamesList = new GameList([], options);
            
            this.listenTo(this.gamesList, 'add', function(e) {
                this.games.push(e.attributes);

                this.isFetching = false 
                this.render();
            });

            this.gamesList.fetch();
        },
        totalResults: function() {
            return this.gamesList.totalResults();
        },
        render: function() {
            this.$el.html(GameListTpl({ totalGames: this.gamesList.totalResults() }));

            for(var idx = 0; idx < this.games.length; idx++) {
                var game = this.games[idx];
                var gameCard = new GameCardView(
                    game.id,
                    game.name,
                    game.released,
                    game.image,
                    game.rating,
                    game.metacritic,
                    game.stores,
                );
                this.$el.find('#game-list-wrapper').append(gameCard.$el);
            }

            return this;
        }, 
    });
});