import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableHighlight,
  Image,
  FlatList,
  Dimensions,
  Linking,
  ImageBackground
} from 'react-native';

import { useHeaderHeight } from '@react-navigation/stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/morestyles'
import liststyles from './styles/liststyles'
import { url } from './resources/fetchInfo.json'
import LinearGradient from 'react-native-linear-gradient';
import StudentWeek from './StudentWeek';
import LunchEvents from './LunchEvents'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Announcements from './Announcements'
import I18n from './i18n.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = "teacherAnnouncements"
const Stack = createStackNavigator()
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getCurrentDate=()=>{
	var date = new Date().getDate();
	var month = new Date().getMonth();
	var year = new Date().getFullYear();

	return new Date(year, month, date);
}

const Announcement = ({item}) => {
	const todayDate = getCurrentDate()
	const itemDate = new Date(item.item.date)
	const dateInfo = todayDate.getTime()===itemDate.getTime()&&item.item.time!==undefined?item.item.time:(item.item.date+", " + item.item.time)
	return (
		<View style={{borderWidth: 1, borderColor: '#323232', padding: '2%', marginHorizontal: '2%', marginBottom: '2%', borderRadius: 12}}>
			<View style = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
				<View style = {{width: '100%'}}>
					<Text style={liststyles.title}>{item.item.message}</Text>
				</View>
				{dateInfo!==undefined?<Text style={{fontSize: 12, fontWeight: '200'}}>{dateInfo}</Text>:<></>}
			</View>
		</View>
	)
}

function NewTeacherList(props) {
  return (
    <View>
      <LinearGradient start={{x: 0.25, y: .5}} end={{x: 1, y: 1}} colors={['#FF8484', '#FF1111']} style={{backgroundColor: 'red', width: '20%', padding: '2%', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginVertical: '2%'}}>
        <Text style={[liststyles.title, {color: 'white', fontWeight: 'bold'}]}>{I18n.t('dates.'+props.name)}</Text>
      </LinearGradient>
      <FlatList
        data={props.list}
        renderItem={item=><Announcement item={item}/>} 
        keyExtractor={item=>JSON.stringify(item)}
      />
    </View>
  )
}

export const TeacherList = ({route}) => {
  const todayDate = getCurrentDate()
	const weekPastDate = new Date();
	var pastDate = weekPastDate.getDate() - 7;
	weekPastDate.setDate(pastDate);
	const weekFutureDate = new Date();
	var futureDate = weekFutureDate.getDate() + 7;
	weekFutureDate.setDate(futureDate);
	const today = []
	const past = []
	const future = []
	var todayBoolean = true
	var pastBoolean = true
	var futureBoolean = true
	
	for (var i = 0; i < route.params.data.length; i++) {
		const itemDate = new Date(route.params.data[i].date)
		if (itemDate.getTime() == todayDate.getTime()) {
			today.push(route.params.data[i])
		}
		else if (itemDate.getTime() > todayDate.getTime() && itemDate.getTime() <= weekFutureDate.getTime()) {
			future.push(route.params.data[i])
		}
		//else if (itemDate >= weekPastDate && itemDate < todayDate) {
		else if (itemDate.getTime() < todayDate.getTime()) {
			past.push(route.params.data[i])
		}
	}
	if (today.length === 0) todayBoolean = false
	if (past.length === 0) pastBoolean = false
	if (future.length === 0) futureBoolean = false
	var noAnn = (todayBoolean||pastBoolean||futureBoolean)

	return (
		<ScrollView style={{flex: 1, backgroundColor: 'white'}}>
			{todayBoolean?<NewTeacherList name = 'today' list = {today} />:<></>}
			{pastBoolean?<NewTeacherList name = 'past' list = {past} />:<></>}
			{futureBoolean?<NewTeacherList name = 'future' list = {future} />:<></>}
			{!noAnn?<Text style={{textAlign: 'center', fontSize: 20, paddingTop: '2%'}}>{I18n.t('home.noAnnouncements')}</Text>:<></>}
		</ScrollView>
	)
}

function NewElement(props) {
  var name = props.name
  return (
    <View style={{}}>
      <LinearGradient start={{x: 0.25, y: .5}} end={{x: 1, y: 1}} colors={['#FF8484', '#FF1111']} style={{backgroundColor: 'red', width: '20%', padding: '2%', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginVertical: '2%'}}>
        <Text style={[liststyles.title, {color: 'white', fontWeight: 'bold'}]}>{I18n.t('dates.'+props.name)}</Text>
      </LinearGradient>
      <View style={{display:'flex', flexDirection: 'row', paddingHorizontal: '5%'}}>
        <FlatList
        data={props.list}
        renderItem={item=><New item={item} navigation={props.navigation}/>}
        keyExtractor={item=>JSON.stringify(item)}
        horizontal
        />
      </View>
    </View>
  )
}

export const whatsNew = ({route}) => {
  const todayDate = getCurrentDate()
	const weekPastDate = new Date();
	var pastDate = weekPastDate.getDate() - 7;
	weekPastDate.setDate(pastDate);
	const weekFutureDate = new Date();
	var futureDate = weekFutureDate.getDate() + 7;
	weekFutureDate.setDate(futureDate);
	const today = []
	const past = []
	const future = []
	var todayBoolean = true
	var pastBoolean = true
	var futureBoolean = true
	
	for (var i = 0; i < route.params.data.length; i++) {
		const itemDate = new Date(route.params.data[i].date)
		if (itemDate.getTime() == todayDate.getTime()) {
			today.push(route.params.data[i])
		}
		else if (itemDate.getTime() > todayDate.getTime() && itemDate.getTime() <= weekFutureDate.getTime()) {
			future.push(route.params.data[i])
		}
		//else if (itemDate >= weekPastDate && itemDate < todayDate) {
		else if (itemDate.getTime() < todayDate.getTime()) {
			past.push(route.params.data[i])
		}
	}
	if (today.length === 0) todayBoolean = false
	if (past.length === 0) pastBoolean = false
	if (future.length === 0) futureBoolean = false

  const item = route.params
  return (
    <ScrollView style={{display:'flex',  backgroundColor: 'white', height: '100%'}}>
      {todayBoolean?<NewElement name = 'today' navigation = {route.params.navigation} list = {today}/>:<></>}
      {pastBoolean?<NewElement name = 'past' navigation = {route.params.navigation} list = {past}/>:<></>}
      {futureBoolean?<NewElement name = 'future' navigation = {route.params.navigation} list = {future}/>:<></>}
    </ScrollView>
  )
}

export const NewItem = ({route}) => {
  const item = route.params.data
  const iconURI = item.icon !== undefined?`data:image/png;charset=utf-8;base64,${item.icon}`:''
  
  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      <View style={{backgroundColor: '#e3e3e3'}}>
        <Image source={require('./assets/blair_logo.png')} style={{width: windowWidth, height: windowHeight*.6, alignSelf: 'center'}}/>
      </View>
      <View style={{backgroundColor: 'white', marginTop: '-5%', padding: '5%', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
        <Text style={{fontSize: 14, fontWeight: '200', textAlign: 'center'}}>{item.date}</Text>
        <Text style={{fontSize: 20, textAlign: 'center', paddingBottom: '2%', fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={{}}></Text>
      </View>
    </ScrollView>
  )
}

const AnnouncementToday = ({item}) => {
  const teacher = item.item.teacher !==""?item.item.teacher:"No Teacher"

  return (
    <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '2%', paddingVertical: '2.5%', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: "#b2b2b2"}}>
      <View style = {{width: '72%'}}>
        <Text style={{fontSize: 18}}>{item.item.message}</Text>
        <Text style={{fontSize: 12, fontWeight: '200', paddingTop: '1%'}}>{item.item.time}</Text>
      </View>
      <View style = {{width: '25%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={{fontSize: 14, alignSelf: 'center', fontWeight: '200'}}>{teacher}</Text>
      </View>
    </View>
  )
}

const New = (props) => {
  const item = props.item
  const iconURI = item.item.icon !== undefined?`data:image/png;charset=utf-8;base64,${item.item.icon}`:''
  const textLength = item.item.name.length
  var text = item.item.name
  if (textLength >=17) {
    text = text.substring(0, 14)+"..."
  }

  return (
    <View style={{paddingRight: '2%'}}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('NewItem', {data:props.item.item})}>
        <ImageBackground style = {{width: windowWidth*.4, height: windowWidth*.55, backgroundColor:'#e3e3e3', borderRadius: 16, alignItems: 'baseline'}}source = {{iconURI}}>
          <View style={{padding: '5%', flex: 1, justifyContent: 'flex-end', width: windowWidth*.4, height: windowWidth*.2, shadowColor: '#323232', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.5}}>
            <Text style={{fontSize: 12, color: 'white', fontWeight: '700'}}>{item.item.date}</Text>
            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>{text}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

function Home1() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modal}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-end'}}>
          <TouchableHighlight onPress={() => {setModalVisible(false);}}>
            <Image source = {require('./assets/exit.png')} style = {{height: 40, width: 40}}/>
          </TouchableHighlight>
        </View>  
        <Image source = {require('./assets/blair_logo.png')} style = {{alignSelf: 'center', marginTop: '5%', height: 325, width: 325}}/>
        <Text style={styles.modalText}>{url}</Text>
      </View>
    </Modal>
  )
}

const background = (<LinearGradient
  colors={['#f99', 'white']}
  style = {{flex:1,borderBottomColor:'black',borderBottomWidth:0}}
  />)

function HomeStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            title:'Blair',
            headerTitleStyle:styles.headerTitle,
            headerBackground: ()=>background
          }}
        />
        <Stack.Screen 
          name="new"
          component={whatsNew}
          options={({route})=> ({
            title:I18n.t('home.whatsNew'),
            headerTitleStyle:styles.headerTitle,
            headerBackground: ()=>background,
            //headerLeft:null,
            headerBackTitleVisible:false,
            headerTintColor: 'black',
            headerTitleAlign: 'center'
          })}
        />
        <Stack.Screen 
          name="Announcements"
          component={Announcements}
          options={({route})=> ({
            title:I18n.t('home.Announcements'),
            headerTitleStyle:styles.headerTitle,
            headerBackground: ()=>background,
            //headerLeft:null,
            headerBackTitleVisible:false,
            headerTintColor: 'black',
            headerTitleAlign: 'center'
          })}
        />
        <Stack.Screen 
						name="TeacherList" 
						component={TeacherList}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle],
							title:route.params.name,
							headerRight:()=>(<></>),
							headerBackground: ()=>background,
							//headerLeft:null,
							headerBackTitleVisible:false,
							headerTintColor: 'black',
							headerTitleAlign: 'center'
						})}
					/>
        <Stack.Screen 
						name="LunchEvents" 
						component={LunchEvents}
						options={{
							title:I18n.t('home.lunch'),
							headerTitleStyle:styles.headerTitle,
							//headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
        <Stack.Screen 
          name="StudentWeek"
          component={StudentWeek}
          options={{
            title:I18n.t('home.SOTW'),
            headerTitleStyle:styles.headerTitle,
            headerBackground: ()=>background,
            //headerLeft:null,
            headerBackTitleVisible:false,
            headerTintColor: 'black',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen 
          name = "NewItem"
          component = {NewItem}
          options={({route})=> ({
            headerTitleStyle:[styles.headerTitle],
            title:I18n.t('home.news'),
            headerRight:()=>(<></>),
            headerBackground: ()=>background,
            //headerLeft: null,
            headerBackTitleVisible:false,
            headerTintColor: 'black',
            headerTitleAlign: 'center'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function HomeScreen (props) {
  const iconURI = props.studentData.icon !== undefined?`data:image/png;charset=utf-8;base64,${props.studentData.icon}`:`data:image/png;base64,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`;
  global.headerHeight = useHeaderHeight();
  const todayDate = getCurrentDate()
  var todayAnn = []
  var todayNew = []
  var todayAnnBoolean = true
  var todayNewBoolean = true
  var showLunch = false
  for (var i = 0; i < props.annData.length; i++) {
    const itemDate = new Date(props.annData[i].date)
    if (itemDate == todayDate) todayAnn.push(props.annData[i])
    else todayAnn.push(props.annData[i])
  }

  for (var i = 0; i < props.data.length; i++) {
    const itemDate = new Date(props.data[i].date)
    if (itemDate == todayDate) todayNew.push(props.data[i])
  }

  if (todayAnn.length === 0) todayAnnBoolean = false
  if (todayNew.length ===0) todayNewBoolean = false
  todayAnn = todayAnn.slice(0, 4)

  var currentTime = new Date();
  var time = currentTime.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3").split(' ')
  var dayOfWeek = currentTime.getDay()
  var hourTime = parseInt(time[0].split(':')[0])

  if (dayOfWeek!=0 && dayOfWeek!=6 && ((hourTime>=10 && time[1]=='AM') || (hourTime ==12 && parseInt(time[0].split(':')[1])<=30 && time[1]=='PM'))) {
    showLunch = true
  }
  if (dayOfWeek!=0 && dayOfWeek!=6 && hourTime>=10 && (hourTime <=12 && parseInt(time[0].split(':')[1])<=30)) {
    showLunch = true
  }

  return (
    <ScrollView style={{paddingHorizontal:'5%', backgroundColor: 'white', height: '100%'}}>
      {showLunch? 
        <View style={{display: 'flex', flexDirection: 'row', paddingTop: '2%'}}>
          <Text style={{textAlign: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '200'}}>{I18n.t('home.shortcut')} {'\t'}</Text>
          <TouchableOpacity onPress={()=>props.navigation.navigate(LunchEvents)}>
            <View style={{padding: '5%', borderRadius: 16, borderWidth: 1, borderColor: 'red'}}>
              <Text style={{fontWeight: '200', color: 'red', textAlign: 'center'}}>{I18n.t('home.seeLunch')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      :<></>}

      <View style={{paddingTop: '2%'}}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '5%'}}>
          <Text style={liststyles.homeTitle}>{I18n.t('home.whatsNew')}</Text>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}onPress={()=>props.navigation.navigate('new', {data:props.data, navigation: props.navigation})}>
            <LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/forward.png')} style={{tintColor: 'white'}}/></LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', display: 'flex', flexDirection: 'row'}}>
            {!todayNewBoolean?<Text style={{fontWeight: '200', fontSize: 16, paddingTop: '2%'}}>{I18n.t('home.noNews')}</Text>:<FlatList
            data={todayNew}
            renderItem={item=><New item={item} navigation={props.navigation}/>}
            keyExtractor={item=>JSON.stringify(item)}
            horizontal
            />}
        </View>
      </View>

      <View style={{marginTop: '5%'}}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '5%'}}>
          <Text style={liststyles.homeTitle}>{I18n.t('home.Announcements')}</Text>
          <TouchableOpacity style={{}}onPress={()=>props.navigation.navigate(Announcements)}>
          <LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/forward.png')} style={{tintColor: 'white'}}/></LinearGradient>
          </TouchableOpacity>
        </View>
        {!todayAnnBoolean?<Text style={{fontWeight: '200', fontSize: 16, paddingTop: '2%'}}>{I18n.t('home.noAnnouncements')}</Text>:<FlatList
          data={todayAnn}
          renderItem={item=><AnnouncementToday item={item}/>}
          keyExtractor={item=>JSON.stringify(item)}
          />}
      </View>

      <View style={{marginTop: '5%', marginBottom: '10%'}}>
        <Text style={[liststyles.homeTitle, {paddingBottom: '5%'}]}>{I18n.t('home.SOTW')}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{backgroundColor: 'white', width: windowWidth*.30, height: windowWidth*.30, shadowColor: 'red', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 7, borderRadius: (windowWidth*.30)/2}}>
            <Image source = {{iconURI}} style = {{height:'100%', width: '100%', borderTopRightRadius: 8, borderTopLeftRadius:8}}/>
          </View>
          <View style ={{width: windowWidth*.60, display: 'flex', paddingLeft: '5%', paddingHorizontal: '2%', alignItems: 'center', justifyContent: 'space-around'}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>{props.studentData.name}, <Text style={{fontWeight: '200', textAlign: 'center'}}>Grade {props.studentData.year}</Text></Text>
            <TouchableOpacity onPress={()=>props.navigation.navigate(StudentWeek)}>
              <View style={{padding: '5%', borderRadius: 16, borderWidth: 1, borderColor: 'red'}}>
                <Text style={{fontWeight: '200', color: 'red', textAlign: 'center'}}>{I18n.t('home.moreOn')} {props.studentData.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

class Home extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
      studentData: [],
      annData:[],
      data:[],
      lunchData:[],
      teacherNames: [],
			favoriteNames: [],
			isLoading:true  
		}
	}
	addFavorite = (name) => {
		const favoriteNames = this.state.favoriteNames.slice().map(({name})=>name)
		const index = favoriteNames.indexOf(name)
		if (index < 0) {
			favoriteNames.push(name)
		}
		else {
			favoriteNames.splice(index,1)
		}
		favoriteNames.sort()
		this.setState({favoriteNames:favoriteNames.map(name=>({name:name}))})
		AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(favoriteNames)).catch(console.log).done()
	}
	componentDidMount() {
		fetch(`${url}/api/en/student`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  }}
		).then((response) => {
			return response.text();list 
		}).then((json) => {
			this.setState({studentData: JSON.parse(json),isLoading:false});
    }).catch((error) => console.error(error))

    fetch(`${url}/api/en/lunchEvents`,{
      headers: {
          'Cache-Control': 'no-cache'
      }}
    ).then((response) => {
      return response.text();
    }).then((json) => {
      this.setState({lunchData: JSON.parse(json)});
    }).catch((error) => console.error(error))
    
    this.getData()
		this.props.navigation.addListener(
			'focus',
			() => {
				this.getData()
			}
    );

    this.getData1()
		AsyncStorage.getItem(STORAGE_KEY)
			.then(value=>value==null?[]:JSON.parse(value).map(x=>({name:x})))
			.then(names=>this.setState({favoriteNames:names}))
			.catch(console.log)
			.done()
  }

  getData() {
		fetch(`${url}/api/en/new`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  } })
		  .then((response) => {
			return response.text();
		  })
		  .then((json) => {
			const data = JSON.parse(json).data
			data.sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime())
			this.setState({data: data});
		  })
		  .catch((error) => console.error(error))
	}

  getData1() {
		fetch(`${url}/api/en/announcements`,{
			headers: {
				'Cache-Control': 'no-cache'
			}})
		.then((response) => {
			return response.text()
		})
		.then((txt) => {
			const data = JSON.parse(txt).data;
			const teacherNames = [...new Set(data.filter(x=>x.teacher!=null&&x.teacher.trim()!=='').map(x=>x.teacher))];
			teacherNames.sort()
			this.setState({annData: data, teacherNames: teacherNames.map(x=>({name:x})),isLoading:false});
    }).catch((error) => console.error(error))
	}
  
	render() {
    return (
      <View>
        <Home1></Home1>
        <HomeScreen navigation={this.props.navigation} annData={this.state.annData} studentData={this.state.studentData} data={this.state.data} challengeData = {this.state.challengeData}></HomeScreen>
      </View>
		)
	}
}
export default HomeStack;