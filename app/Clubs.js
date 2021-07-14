import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, 
  FlatList,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SearchBar } from 'react-native-elements';
import styles from './styles/liststyles'
import morestyles from './styles/morestyles'
import { url } from './resources/fetchInfo.json'
import LinearGradient from 'react-native-linear-gradient';
import I18n from './i18n';

const Stack = createStackNavigator();

export const ClubInfo = ({route}) => {
  const item = route.params;
  return (
    <View style = {{padding: 10, backgroundColor: 'white', height: '100%'}}>
      <View style ={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
        <View style={{width: '17%', display: 'flex', justifyContent: 'center'}}>
          <Image source ={require('./assets/time.png')} style={{width: 50, height: 50}}/>
        </View>
        <View style={{width: '83%'}}>
          <Text style = {{fontSize:20}}>{item.meeting}</Text>
        </View>
      </View>
      <View style ={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
        <View style={{width: '17%', display: 'flex', justifyContent: 'center'}}>
          <Image source ={require('./assets/zoom.png')} style={{width: 50, height: 50}}/>
        </View>
        <View style={{width: '83%'}}>
          <Text style = {[styles.linktext,{fontSize:20}]} onPress={() => Linking.openURL(item.link)}>{item.link}</Text>
        </View>
      </View>
			<View style ={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
        <View style={{width: '17%', display: 'flex', justifyContent: 'center'}}>
          <Image source ={require('./assets/sponsor.png')} style={{width: 50, height: 50}}/>
        </View>
        <View style={{width: '83%'}}>
          <Text style = {{fontSize:20}}>{item.sponsor}</Text>
        </View>
      </View>
    </View>
  )
}
function ClubElement (props) {
  const item = props.item;
  return(
	<View>
      <TouchableOpacity style={styles.item1} onPress={()=>props.navigation.navigate('ClubInfo', {data:props.data,name:props.name,meeting:item.meeting,link:item.link,sponsor:item.sponsor})} activeOpacity={0.8}>
        <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Image source = {require('./assets/clubs.png')} style = {{height: 40, width: 40, marginRight: 10}}/>
          <Text style={styles.title3}>{props.item.name}</Text>
        </View>
        
      </TouchableOpacity>
	</View>
  )
}

const background = (<LinearGradient
  colors={['#f99', 'white']}
  style = {{flex:1,borderBottomColor:'black',borderBottomWidth:0.5}}
  />)

function Club () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name = "Clubs"
          component = {Clubs}
          options={({
            headerShown: false
          })}
        />
        <Stack.Screen 
          name = "ClubInfo"
          component = {ClubInfo}
          options={({route})=>({
            title:route.params.name,
            headerTitleStyle:[morestyles.headerTitle,{alignSelf:'center'}],
            headerBackground: ()=>background
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) 
}

class Clubs extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataSearch:[],
      search:""
    };
  }

  componentDidMount() {
    this.getData()
	this.props.navigation.addListener(
			'focus',
			() => {
				this.getData()
			}
		);
  }
  
  getData() {
	  fetch(`${url}/api/en/clubs`,{
      headers: {
        'Cache-Control': 'no-cache'
      } })
      .then((response) => {
        return response.text();
      })
      .then((json) => {
        this.setState({data: JSON.parse(json).clubs,dataSearch:JSON.parse(json).clubs });
      })
      .catch((error) => console.error(error))
  }
  
  updateSearch = (search) => {
    this.setState({ search:search });
	const searchPool = search.startsWith(this.state.search)?this.state.dataSearch:this.state.data;
    const ds = searchPool.filter((thing)=>{return thing.name.toLowerCase().startsWith(search.toLowerCase())})
    this.setState({dataSearch: ds})
  };
  clearSearch  = (search)=>{
    const ds = this.state.data;
    this.setState({dataSearch:ds})
  }
  render() {
    const { data , dataSearch,search} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
        lightTheme
        placeholder={'Search Clubs'}
        onChangeText={this.updateSearch}
        onCancel={this.clearSearch}
        onClear={this.clearSearch}
        value={this.state.search}/>
      <FlatList
        data={dataSearch}
        renderItem={({item}) => <ClubElement item={item} name={item.name} navigation={this.props.navigation}/>}
        keyExtractor={item => JSON.stringify(item)}
      />
      
    </SafeAreaView>
    
    );
  }
}

export default Club;