<div id="genre-list-wrapper">
    <% for(var idx = 0; idx < genres.length; idx++) { %>
        <fe-genre-item
            data-id="<%= genres[idx].id %>"
            name="<%= genres[idx].name %>"
        ></fe-genre-item>
    <% } %>
</div>