import * as React from 'react'

type props = {
    id: number
    name: string
}

type state = {
    selected: boolean
}

export default class GenreItemComponent extends React.Component<props, state> {
    constructor(props: any) {
        super(props);

        this.state = {
            selected: false
        }

        this._setSelect = this._setSelect.bind(this);
    }

    _setSelect(e: any): void {
        if(e.detail.id == this.props.id) {
            this.setState({ selected: true });
        } else {
            this.setState({ selected: false });
        }
    }

    componentDidMount() {
        window.addEventListener('GenreList:select', this._setSelect);
    }

    componentWillUnmount() {
        window.removeEventListener('GenreList:select', function() {});
    }

    render() {
        return (
            <span className={`${this.state.selected ? 'selected' : null}`}>{this.props.name}</span>
        )
    }
}