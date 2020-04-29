import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { white, blue, whiteGrey, darkBlue } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { addNewDeck } from '../utils/api';

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
          <TextInput style={styles.input}
            placeholder="Add Deck Name*"
            autoFocus={true}
            returnKeyType="done"
            value={this.state.name}
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleSubmit} />
        </View>
        <TouchableOpacity style={[styles.submitBtn, disabled && styles.btnDisabled]} onPress={this.handleSubmit} disabled={disabled && disabled}>
          <Text style={[styles.btnText]}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, { addDeck })(AddDeck);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: whiteGrey
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: darkBlue,
    backgroundColor: white,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    marginBottom: 0
  },
  submitBtn: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue
  },
  btnText: {
    color: darkBlue,
    fontSize: 16,
    color: white
  },
  btnDisabled: {
    backgroundColor: '#ccc'
  }
});