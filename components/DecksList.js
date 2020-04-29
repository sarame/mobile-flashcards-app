import React, { Component } from 'react';
import { View,Text,ScrollView,TouchableOpacity,StyleSheet } from 'react-native';
import { handleInitialData, removeDeckAction } from '../actions/index';
import { connect } from 'react-redux';
import { removeDeckAPI } from '../utils/api';
import { white, green, red, grey } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export class DecksList extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  handleRemove = title => {
    this.props.removeDeckAction(title);
    removeDeckAPI(title);
  };
  render() {
    return (
      <ScrollView style={styles.decksWrap}>
        <Text style={styles.title}>Mobile Flashcards</Text>
        {Object.values(this.props.decks).map((deck, index) => {
          return (
            <TouchableOpacity key={`${index}title`}
                              onPress={() =>
                                this.props.navigation.navigate('DeckCard', { 
                                  title: deck.title 
                                })
                              }>
            <View style={styles.cardWrap} key={`${index}title`}>
              <Text style={[styles.deckText, {fontWeight: 'bold'}]}>
                {deck.title}
              </Text>
              <Text style={styles.deckText}>
                {deck.questions.length}
              </Text>
              <TouchableOpacity onPress={() => this.handleRemove(deck.title)}>
                <Ionicons name='ios-trash' size={32} color={red}/>
              </TouchableOpacity>
            </View>    
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    )
  };
}


const mapStateToProps = state => ({ 
  decks: state 
});

export default connect( mapStateToProps, { handleInitialData, removeDeckAction } )(DecksList);

const styles = StyleSheet.create({
  decksWrap: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: '#288AED'
  },
  cardWrap: {
    padding: 16,
    textAlign: 'center',
    marginBottom: 16,
    borderColor: grey,
    borderWidth: 1,
    borderRadius: 5
  },
  deckText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: grey
  }
});