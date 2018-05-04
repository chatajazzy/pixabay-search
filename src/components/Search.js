import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from './ImageResults';

export default class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '8905484-a3d137332b6cc8467dc26145a',
    images: []
  };
  onTextChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(response =>
            this.setState({
              images: response.data.hits
            })
          )
          .catch(error => console.log(error));
      }
    );
  };
  onAmountChange = (e, index, value) => {
    this.setState({
      amount: value
    });
  };
  render() {
    console.log('sta', this.state);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search from images"
          fullWidth={true}
        />
        <SelectField
          name="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          floatingLabelText="Frequency"
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
