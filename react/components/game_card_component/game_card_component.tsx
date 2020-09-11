import * as React from 'react'
// @ts-ignore
import moment from 'moment'

type props = {
    id: number,
    name?: string,
    released?: Date,
    image?: string,
    rating?: number,
    metacritic?: number,
}

export default class GameCardComponent extends React.Component<props, any> {
    metacriticscore(score: number): string {
        // Based on https://www.metacritic.com/about-metascores
        if(score >= 60) {
            return 'high';
        } else if(score >= 40 && score < 60) {
            return 'medium';
        } else if(score < 40 && score > 0) {
            return 'low';
        }

        return '';
    }

    handleClick() {
        window.dispatchEvent(new CustomEvent('game-card:click', { detail: { id: this.props.id }}));
    }

    dateFormat(date: Date): string {
        return moment(date).format('YYYY-MM-DD');
    }

    render() {
        return (
            <div className="fe-game-card">
                <a onClick={() => this.handleClick()}>
                    {this.props?.image ? (
                        <div 
                            className="fe-game-card--image-wrapper" 
                            style={{ backgroundImage: `url('${this.props.image}')` }}>
                        </div>
                    ) : null}
                    <div className="fe-game-card--game-info">
                        <h2>{this.props?.name ?? "--"}</h2>
                        <div className={`fe-game-card--metacritic ${this.metacriticscore(this.props.metacritic)}`}>
                            <span className="fe-game-card--metacritic-note">{!this.props.metacritic || this.props.metacritic <= 0 ? "N/A" : this.props.metacritic}</span>
                        </div>
                        <div className="fe-game-card--release-date">
                            <span>Release date: {this.dateFormat(this.props?.released)}</span>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}