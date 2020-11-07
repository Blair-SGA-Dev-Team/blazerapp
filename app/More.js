import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
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

import styles from './styles/morestyles'
import Announcements, {TeacherList} from './Announcements'
import Resources from './Resources'
import StudentWeek from './StudentWeek'
import SSLOps, {SSLInfo} from './SSLOps'
import LunchEvents, {LunchInfo} from './LunchEvents'
import ChallengeWeek from './ChallengeWeek'
import LinearGradient from 'react-native-linear-gradient'

const Stack = createStackNavigator()

class MoreSwitch extends React.Component {
	constructor(props) {
		super(props)
		this.props = props
	}
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:'red'}}>
				<FlatList
					data={[
						{name:"Announcements",key:"announce"},
						{name:"Resources",key:"resources"},
						{name:"Student of the Week",key:"studentweek"},
						{name:"Lunch Events",key:"lunchevent"},
						{name:"SSL Opportunities",key:"sslops"},
						{name:"Challenge of the Week",key:"challengeweek"},
					]}
					renderItem={({item})=>
						<TouchableOpacity style={styles.moreitem} onPress={()=>this.props.navigation.navigate(item.key)}>
							<Text style={styles.moretext}>{item.name}</Text>
						</TouchableOpacity>
					}
				/>
			</View>
		)
	}
}

const background = (<LinearGradient
                    colors={['#f99', 'white']}
                    style = {{flex:1,borderBottomColor:'black',borderBottomWidth:0.5}}
                    />)

class More extends React.Component {
	render() {
		return (
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Chooser" 
						component={MoreSwitch}
						options={{
							title:'More',
							headerTitleStyle:styles.headerTitle,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="announce" 
						component={Announcements}
						options={{
							title:'Announcements',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="resources" 
						component={Resources}
						options={{
							title:'Resources',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="studentweek" 
						component={StudentWeek}
						options={{
							title:'Student of the Week',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="lunchevent" 
						component={LunchEvents}
						options={{
							title:'Lunch Events',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="sslops" 
						component={SSLOps}
						options={{
							title:'SSL Opportunities',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="challengeweek" 
						component={ChallengeWeek}
						options={{
							title:'Challenge of the Week',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="TeacherList" 
						component={TeacherList}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center',fontSize:Math.min(24,24*23/route.params.name.length)}],
							title:route.params.name,
							headerRight:()=>(<></>),
							headerBackground: ()=>background
						})}
					/>
					<Stack.Screen 
						name="LunchInfo" 
						component={LunchInfo}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center',fontSize:Math.min(24,24*23/route.params.name.length)}],
							title:route.params.name,
							headerRight:()=>(<></>),
							headerBackground: ()=>background
						})}
					/>
					<Stack.Screen 
						name="SSLInfo" 
						component={SSLInfo}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center',fontSize:Math.min(24,24*23/route.params.name.length)}],
							title:route.params.name,
							headerBackground: ()=>background,
							headerRight:()=>(<></>)
						})}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}

export default More;