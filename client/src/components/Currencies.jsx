import React from 'react';
import Select from 'react-select';
import { CURRENCY_NAMES } from '../constants/currencies';

class Currencies extends React.Component{
	constructor(props) {
		super(props);	
		this.updateValue = this.updateValue.bind(this)
		this.state = {
			currency: "usd",
			disabled: false,
			searchable: this.props.searchable,
			selectValue: "usd",
			clearable: false,
			rtl: false,
		}
	}

	updateValue(newValue) {
		this.props.onUpdate(newValue.label);
		this.setState({
			selectValue: newValue.value,
		});
	}

	render () {
		var options = CURRENCY_NAMES;
		return (	
			<div className="section" style={{width:'70px',margin:'7px'}}>
				<Select
					id="currency-select"
					ref={(ref) => { this.select = ref; }}
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					options={options}
					clearable={this.state.clearable}
					name="selected-state"
					disabled={this.state.disabled}
					value={this.state.selectValue}
					onChange={this.updateValue}
					rtl={this.state.rtl}
					searchable={this.state.searchable}
				/>
			</div>
		);
	}
}

export default Currencies;