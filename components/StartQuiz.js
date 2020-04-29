import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { white, green, red, grey } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';


const WindowWidth = Dimensions.get('window').width;

class StartQuiz extends Component{
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  state = {
    toggleView: 'question',
    currentQIndex: 0,
    correctAnswers: 0,
    inCorrectAnswers: 0
  }

  render() {
    const QL = this.props.deck.questions.length;
    const currentQuestion = this.props.deck.questions[this.state.currentQIndex]

    const restartQuiz = () => {
      this.setState({
        toggleView: 'question',
        currentQIndex: 0,
        correctAnswers: 0,
        inCorrectAnswers: 0
      })
    }
    const handleAnswerQuestion = (answer) => {
      if (answer == 'correct') {
        this.setState({
          correctAnswers: this.state.correctAnswers + 1,
        });
      } else if (answer == 'correct') {
        this.setState({
          inCorrectAnswers: this.state.inCorrectAnswers + 1
        });
      }
      if(this.state.currentQIndex <= (QL - 2)) {
        this.setState({
          currentQIndex: this.state.currentQIndex + 1
        });
      } else {
        this.setState({
          toggleView: 'result'
        });
      }
    }

    const Answer = (props) => {
      return (
        <React.Fragment>
          <View style={styles.textWrap}>
            <Text style={styles.title}>
              {props.index + 1} / {QL}
            </Text>
            <Text style={styles.question}>
              {props.question.answer}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.btn, styles.hollowBtn]} 
                              onPress={() => this.setState({toggleView: 'question'})}>
              <Text style={{fontSize: 18}}>
                <Ionicons name='ios-arrow-back' size={16} color='black'/>  Back to Question
              </Text> 
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )
    }
    const Question = (props) => {
      return (
        <React.Fragment>
          <View style={styles.textWrap}>
            <Text style={styles.title}>
              {props.index + 1} / {QL}
            </Text>
            <Text style={styles.question}>
              {props.question.question}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.btn, styles.hollowBtn]} 
                              onPress={() => this.setState({toggleView: 'answer'})}>
              <Text style={{fontSize: 18}}>
              <Ionicons name='ios-information-circle' size={18} color='black'/>  Show Answer</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor: green}]}
                              onPress={() => handleAnswerQuestion('correct')}>
              <Text style={[styles.text, styles.btnText]}>
                <Ionicons name='ios-thumbs-up' size={18} color='white'/>  Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor: red}]}
                              onPress={() => handleAnswerQuestion('incorrect')}>
              <Text style={[styles.text, styles.btnText]}>
                <Ionicons name='ios-thumbs-down' size={18} color='white'/>  InCorrect
              </Text> 
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )
    }
    const Result = (props) => {
      return (
        <React.Fragment>
          <View style={styles.textWrap}>
            <Text style={[styles.resultText, {color: green, fontSize: 36}]}>
              Result: 
            </Text>
            <Text style={styles.resultText}>
              Correct Answers:  {this.state.correctAnswers}/{QL}
            </Text>
            <Text style={styles.resultText}>
              InCorrect Answers:  {this.state.inCorrectAnswers}/{QL}
            </Text>
            <Text style={styles.resultText}>
              Percentage:  {((this.state.correctAnswers / QL)*100).toFixed(0)}%
            </Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.btn, {backgroundColor: red}]}
                              onPress={() => restartQuiz()}>
              <Text style={[styles.text, styles.btnText]}>
                <Ionicons name='ios-repeat' size={20} color='white'/> Restart Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.hollowBtn]} 
                              onPress={() => this.props.navigation.navigate('DecksList')}>
              <Text style={{fontSize: 18}}>
                <Ionicons name='ios-home' size={20} color='black'/> Go to Decks List
              </Text> 
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )
    }

    return (
      <ScrollView style={styles.viewWrap} pagingEnabled={true} horizontal={true}>
        <View style={styles.contentWrap}>
          { this.state.toggleView == 'question' &&
              <Question index={this.state.currentQIndex} question={currentQuestion}/>
          }
          { this.state.toggleView == 'answer' &&
              <Answer index={this.state.currentQIndex} question={currentQuestion}/>
          }
          { this.state.toggleView == 'result' &&
              <Result/>
          }
        </View>
      </ScrollView>
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

export default connect(mapStateToProps)(StartQuiz);

const styles = StyleSheet.create({
  viewWrap: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  contentWrap: {
    flex: 1,
    padding: 16,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    width: WindowWidth - 32
  },
  textWrap: {
    justifyContent: 'center', 
    flex: 1
  },  
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 16
  },
  question: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32
  },
  hollowBtn: {
    borderWidth: 1,
    borderColor: grey
  },
  btn: {
    borderRadius: 4,
    height: 50,
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    marginBottom: 8
  },
  btnText: {
    color: black
  },
  resultText: {
    color: '#444',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  }
});