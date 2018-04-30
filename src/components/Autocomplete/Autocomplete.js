import React from 'react';
import Autosuggest from 'react-autosuggest';
import data from './food.json';

const getSuggestions = (value, items) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : items.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div className="autoCompleteText">
        {suggestion.name}
    </div>
);

class Autocomplete extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            foodFromJson: []
        };
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });

        this.props.onChange("newItem", newValue)
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.state.foodFromJson)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    componentDidMount() {
        this.setState({
            foodFromJson: data
        })
    }

    render() {
        const {value, suggestions} = this.state;

        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: this.onChange,
            onKeyUp: this.props.onKeyUp
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default Autocomplete;