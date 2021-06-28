import { inputEncoding } from 'min-document'
import React, { useEffect, useState } from 'react'
import react from 'react'
import {View, Button, ScrollView, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      data: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.getMeet()
  }

  // fetch all meets
  getMeet(){
    fetch('https://zellab-pineapple.herokuapp.com/meets')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
      console.log('Loaded Data')
  }

  //create a new meeting
  createMeet(){
    let data = this.state
    fetch('https://zellab-pineapple.herokuapp.com/meets', {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(this.getMeet())
    console.log('Created Successfully')
  }

  //delete a meeting
  deleteMeet(id) {
    let itemid = id
    fetch('https://zellab-pineapple.herokuapp.com/meets/' + itemid, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(this.getMeet())
    console.log('Deleted Successfully')
  }
    
  render(){
    
    const { data, isLoading } = this.state;
    const sortedData = data.sort((a, b) => b.date - a.date)

    return(
      <View style={styles.main}>
        <View style={{flexDirection:"row"}}>
          <View style={{flex:1}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, }}>Zellab Meetings</Text>  
          </View>
          <View style={{flex:1}}>
            <Text onPress={this.getMeet()} style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'right' }}>🌀</Text>  
          </View>
        </View>

        <TextInput placeholder='Meeting Title' onChangeText={(text) => {this.setState({title: text})}} style={styles.input}/>

        <TextInput placeholder='Meeting Description' onChangeText = {(text) => {this.setState({content: text})}} multiline = {true} numberOfLines = {3} style={styles.input}/>

        <TextInput placeholder='Meeting Room' onChangeText = {(text) => {this.setState({room: text})}} style={styles.input}/>  

        <View style={{flexDirection:"row"}}>
          <View style={{flex:1}}>
            <TextInput placeholder='Start Time' onChangeText = {(text) => {this.setState({start: text})}} style={styles.inputLeft}/>  
          </View>
          <View style={{flex:1}}>
            <TextInput placeholder='End Time' onChangeText = {(text) => {this.setState({end: text})}} style={styles.inputRight}/>
          </View>
        </View>

        <View style={{marginVertical: 5}}>
          <TouchableOpacity onPress={() => {this.createMeet()}} style={{ paddingVertical: 15, alignItems: 'center', backgroundColor: '#1a87ed', borderRadius: 10 }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Create Meet</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            style={{marginTop: 10, marginBottom: 245}}
            data={sortedData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => {this.deleteMeet(item._id)}}>
              <View style={styles.item}>
                <Text>{item.title}</Text>
                <Text>{item.content}</Text>
                <Text>{item.room}</Text>
                <Text>{item.start} - {item.end}</Text>
              </View>
            </TouchableOpacity>
            )}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F0F0F0',
    marginVertical: 2,
    textAlignVertical: 'top'
  },
  inputLeft: {
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F0F0F0',
    marginVertical: 2,
    marginRight: 2,
    textAlignVertical: 'top'
  },
  inputRight: {
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F0F0F0',
    marginVertical: 2,
    marginLeft: 2,
    textAlignVertical: 'top'
  },
  item: {
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10, 
    borderRadius: 10,   
  }
})

export default App