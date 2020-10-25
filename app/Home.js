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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/morestyles'

function Home1() {

const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modal}>
            <View style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-end'}}>
              <TouchableHighlight onPress={() => {setModalVisible(!modalVisible);}}>
                <Image source = {require('./assets/exit.png')} style = {{height: 40, width: 40}}/>
              </TouchableHighlight>
            </View>  
            <View>
              <Image source = {require('./assets/blair_logo.png')} style = {{alignSelf: 'center', marginTop: '5%', height: 325, width: 325}}/>
              <Text style={styles.modalText}>hgjriwogjewope</Text>
            </View>
          </View>
        </Modal>
      </View>
      <View>

      </View>
    </View>
  )
}
class Home extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			data: [],
			isLoading:true
		}
	}
	
	/*componentDidMount() {
		fetch(`${url}/api/en/popup`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  }}
		).then((response) => {
			return response.text();
		}).then((json) => {
			this.setState({data: JSON.parse(json),isLoading:false});
		}).catch((error) => console.error(error))
  }*/
  
	render() {
		return (
      <View>
        <Home1></Home1>
      </View>
		)
	}
}
export default Home;