import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { white, red, black, blue, whiteGrey, darkBlue } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export class DeckCard extends Component {
 render() {
  const disabled = (this.props.deck.questions.length === 0) ? true : false
  return (
    <View style={styles.wrapperDeckCard}>
      <Text style={styles.text}>
        {this.props.deck.title}
      </Text>
      <Text style={[styles.questionsText]}>
        {this.props.deck.questions.length} Question
      </Text>
      <View style={styles.btnsWrap}>
        <TouchableOpacity style={styles.btn}
          onPress={() =>
            this.props.navigation.navigate('AddQuestion', { title: this.props.deck.title })
          }>
          <Text style={styles.btnText}>
            <Ionicons name='ios-add-circle-outline' size={16} color={black} 
            style={{marginRight: 16}}/> Add Question
          </Text>
        </TouchableOpacity>
        { !disabled &&
          <TouchableOpacity style={[styles.btn]}
            onPress={() => this.props.navigation.navigate('StartQuiz', { 
              title: this.props.deck.title,
             })}>
            <Text style={styles.btnText}>
            <Ionicons name='ios-help-circle-outline' size={16} color={black} 
              style={{marginRight: 16}}/> Start Quiz
            </Text>
          </TouchableOpacity>
        }
        { disabled &&
          <Text style={{color: red, fontSize: 16, textAlign: 'center'}}>
            You can't take this quiz, cause there are no Questions!
         </Text>
        }
      </View>
    </View>
  );
 }
}

const mapStateToProps = (state, { route }) => {
  const title = route.params.title || undefined;
  const deck = state[title];
  return {
    deck
  };
};
export default connect(mapStateToProps)(DeckCard);

const styles = StyleSheet.create({
  wrapperDeckCard: {
    flex: 1,
    padding: 32,
    paddingTop: 64,
    backgroundColor: whiteGrey
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000'
  },
  questionsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#004290',
    marginTop: 8, 
    marginBottom: 32
  },
  btnsWrap: {
    flex: 1
  },
  btn: {
    height: 50,
    padding: 16,
    marginBottom: 8,
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: blue,
    color:black,
    backgroundColor: white

  },
  btnText: {
    color: black,
    fontSize: 16,
  }
});