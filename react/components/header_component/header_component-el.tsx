import * as React from 'react'
import * as ReactDOM from 'react-dom'
// @ts-ignore
import retargetEvents from 'react-shadow-dom-retarget-events';
import HeaderComponent from './header_component';

const style = require('./header_component.less')

class HeaderElement extends HTMLElement {
    connectedCallback() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './dist/' + style.default);

        const mountPoint = this.attachShadow({ mode: 'open' })
        
        ReactDOM.render(
            <HeaderComponent 
            ></HeaderComponent>, 
        mountPoint);
        mountPoint.prepend(link);

        retargetEvents(mountPoint)
    }
}

customElements.define('fe-header', HeaderElement);