define([
    'underscore',
    'backbone',
    'tpl!../../templates/HeaderTemplate.tpl',
], function(_, Backbone, HeaderTpl) {
    return Backbone.View.extend({
        initialize: function(options) {
            this.gamelist = options.gamelist

            _.bindAll(this, 'searchChanged');
            this.searchChanged = _.debounce(this.searchChanged, 1000);

            _.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
            var _this = this; 
            this.render = _.wrap(this.render, function(render) { 
                _this.beforeRender(); 
                render(); 
                _this.afterRender(); 
                return _this; 
            }); 

            this.render();
        },
        beforeRender: function() {
            window.addEventListener('Header:input-change', this.searchChanged);
        },
        render: function() {
            this.$el.html(HeaderTpl);
            return this;
        },
        afterRender: function() {
            window.removeEventListener('Header:input-change', function() {});
        },
        events: {
            "keyup #fe-header--search-input": "searchChanged",
        },
        searchChanged: function(e) {
            var value = e.detail.text;
            if(value.length >= 3) {
                this.gamelist.fetchGames('SEARCH', value)
            } else {
                this.gamelist.fetchGames()
            }
        },
    });
});