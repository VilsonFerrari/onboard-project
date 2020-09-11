define([
    'backbone'
], function(Backbone) {
    return Backbone.View.extend({
        tagName: 'fe-game-card',
        initialize: function(id, name, released, image, rating, metacritic, stores) {
            this.el.setAttribute('data-id', id);
            this.el.setAttribute('name', name);
            this.el.setAttribute('released', released);
            this.el.setAttribute('image', image);
            this.el.setAttribute('rating', rating);
            this.el.setAttribute('metacritic', metacritic);

            window.addEventListener("game-card:click", this.cardClicked);
        },
        attributes: {
            class: "game-list-item",
        },
        cardClicked: function(e) {
            var id = e.detail.id;
            console.log(id);
            // console.log('You\'ve clicked on ' + this.el.getAttribute('name') + '. This game is rating ' + this.el.getAttribute('rating') + '.');
        }
    });
});