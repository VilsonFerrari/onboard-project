import * as React from 'react'
import * as ReactDOM from 'react-dom'
// @ts-ignore
import retargetEvents from 'react-shadow-dom-retarget-events';
import GameCardComponent from './game_card_component';

const style = require('./game_card_component.less')

class GameCardElement extends HTMLElement {
    get dataId() {
        return parseInt(this.getAttribute('data-id'));
    }

    get name() {
        return this.getAttribute('name');
    }

    get released(): Date {
        return new Date(this.getAttribute('released'));
    }

    get image() {
        return this.getAttribute('image');
    }

    get rating() {
        return parseFloat(this.getAttribute('rating'));
    }

    get metacritic() {
        return parseInt(this.getAttribute('metacritic'));
    }

    connectedCallback() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './dist/' + style.default);

        const mountPoint = this.attachShadow({ mode: 'open' });

        ReactDOM.render(
            <GameCardComponent 
                id={this.dataId}
                name={this.name}
                released={this.released}
                image={this.image}
                rating={this.rating}
                metacritic={this.metacritic}
            ></GameCardComponent>, 
        mountPoint);
        mountPoint.prepend(link);

        retargetEvents(mountPoint);
    }
}

customElements.define('fe-game-card', GameCardElement);