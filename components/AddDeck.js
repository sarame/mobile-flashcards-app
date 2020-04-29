import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { grey, green, white, red } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { addNewDeck } from '../utils/api';
import { styles } from "../assets/style";

export class AddDeck extends Component {

  state = {
    name: '',
  }

  handleChange = (name) => {
    this.setState({ name });
  }

  handleSubmit = () => {
    this.props.addDeck(this.state.name);
    addNewDeck(this.state.name);
    this.props.navigation.navigate('DeckCard', { 
      title: this.state.name
    })
  }

  render() {
    const disabled = (this.state.name === '') ? true : false
    return (
      <View style={styles.wrapper}>
        <View style={{ height: 60 }} />
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Add Deck Name: </Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <TextInput  style={styles.input}
                      placeholder="Add Deck Name*"
                      autoFocus={true}
                      returnKeyType="done"
                      value={this.state.name}
                      onChangeText={this.handleChange}
                      onSubmitEditing={this.handleSubmit}/>
        </View>
        <TouchableOpacity style={[styles.submitBtn, disabled && styles.btnDisabled]} onPress={this.handleSubmit} disabled={disabled && disabled}>
          <Text style={[ styles.btnText ]}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect( null, { addDeck })(AddDeck);
