import * as React from 'react'
import * as ReactDOM from 'react-dom'
import GenreItemComponent from './genre_item_component';

const style = require('./genre_item_component.less')

class GenreItemElement extends HTMLElement {
    get dataId(): number {
        return parseInt(this.getAttribute('data-id'));
    }

    get name(): string {
        return this.getAttribute('name');
    }

    connectedCallback() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './dist/' + style.default);

        const mountPoint = this.attachShadow({ mode: 'open' })

        ReactDOM.render(
            <GenreItemComponent 
                id={this.dataId}
                name={this.name}
            ></GenreItemComponent>, 
        mountPoint);
        mountPoint.prepend(link);
    }
}

customElements.define('fe-genre-item', GenreItemElement);