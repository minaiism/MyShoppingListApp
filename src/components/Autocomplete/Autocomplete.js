import React from 'react';
import Autosuggest from 'react-autosuggest';
import data from './food.json';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, items) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : items.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class Autocomplete extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
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

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.state.foodFromJson)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
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

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: this.onChange,
            onKeyUp: this.props.onKeyUp
        };

        // Finally, render it!
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