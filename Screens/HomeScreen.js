import * as React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      word: '',
      definition: '',
      lexicalCategory: '',
    };
  }
  getWord = (word) => {
    var searchKeyword = word.toLowerCase();

    var url =
      'https://rupinwhitehatjr.github.io/dictionary/%22' +
      searchKeyword +
      '%22.json';
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordType;
          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'not Found',
          });
        }
      });
  };

  render() {
    return (
      <View>
        <Header
          centerComponent={{
            text: 'Dictionary',
            style: {
              color: 'neon',
              fontSize: 30,
              fontFamily: 'Times New Roman',
            },
          }}
        />
        <TextInput
          title="Enter Word"
          style={{
            marginTop: 200,
            width: 300,
            alignSelf: 'center',
            height: 40,
            textAlign: 'justify',
            backgroundColor:'#2089DC'
          }}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={{
            marginTop:20,
            alignSelf: 'center',
            backgroundColor:'#2089DC',
            width:50,
            
          }}
          onPress={() => {
            this.setState({ isSearchPressed: true }),
              this.getWord(this.state.text);
          }}>
          <Text style={{ color: 'black', alignSelf: 'center',fontSize:30 }}>Go</Text>
        </TouchableOpacity>
        <View>
          <Text>Word:{''}</Text>
          <Text>{this.state.word}</Text>
          <Text>Type:{''}</Text>
          <Text>{this.state.lexicalCategory}</Text>
          <Text>Definition:{''}</Text>
          <Text>{this.state.definition}</Text>
        </View>
      </View>
    );
  }
}
