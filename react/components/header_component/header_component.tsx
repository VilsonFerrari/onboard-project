import * as React from 'react'

export default class HeaderComponent extends React.Component<{}, any> {
    changed(e: any): void {
        window.dispatchEvent(new CustomEvent('Header:input-change', { 
            detail: { text: e.target.value } 
        }));
    }

    render() {
        return (
            <div className="fe-header">
                <div className="fe-header--title">
                    <h1>PS4 GAME LIST</h1>
                </div>
                <div className="fe-header--search-wrapper">
                    <input onChange={(e: any) => this.changed(e)} id="fe-header--search-input" placeholder="SEARCH" />
                </div>
            </div>
        )
    }
}