import React from 'react';
import {
    View, 
    Text, StyleSheet, 
    TouchableOpacity, 
    ImageBackground, Image, FlatList, TouchableWithoutFeedback
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL from '../global/global';

  
  const Item = ({item}) => (
      <View style={{
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: (item.type == 'DR') ? '#f5c6cb' : '#155724',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
      }}>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <Text>{item.description}</Text>
            <Text>{new Date(item.created_at).toLocaleDateString() +'|'+ new Date(item.created_at).toLocaleTimeString()}</Text>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <Text>RM {parseFloat(item.amount).toFixed(2)}</Text>
            <Text>{item.type}</Text>
        </View>
        <View>
        <Text>{item.user_description}</Text>
        </View>
    </View>
  );


function Ewallet ({navigation}){
const [balance, setBalance] = React.useState(0);
const [history, setHistory] = React.useState(null);

const renderItem = ({ item }) => (
    <Item item={item} />
);

const _getBalance = () => {
    fetch('https://fypproject.greenpixi.com/api/balance', {
        method: "GET",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GLOBAL.AUTH.token
        }
    })
        .then(response => response.json())
        .then(response => {
        setBalance(response.balance.balance);
        });
}

const _getHistory = () => {
    fetch('https://fypproject.greenpixi.com/api/history', {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GLOBAL.AUTH.token
        }
    })
        .then(response => response.json())
        .then(response => {
            setHistory(response);
        });
}


React.useEffect(() => {
    _getBalance();
    _getHistory();
}, []);


return(
<View>
    <TouchableOpacity style={styles.header} onPress={() => navigation.openDrawer()}>
        <Icon name="reorder-four-outline" color={'#ffffff'} size={20} />
        <Text style={{fontSize:20, fontWeight:'bold', color:'#ffffff', marginHorizontal:15}}>Digital Matric</Text>
    </TouchableOpacity>

    <ImageBackground style={{ width:wp("100%"),height:hp("100%"),}} source={require('../images/bg.jpg')}>
    <View style={{alignItems:'center'}}>

        <View style={styles.container2}> 

            <Image
                style={{ width:50, height:60, marginTop:20}}
                source={require('../images/wallet.png')}/> 

            <TouchableOpacity onPress={() => _getBalance()}>
                <Text style={{borderBottomWidth:0.8,
                width:wp('95%'),
                marginVertical:10,
                paddingBottom:5, 
                textAlign:"center", 
                fontWeight:"bold", 
                fontSize: 25, 
                color:'white'}}>
                My Balance: RM {parseFloat(balance).toFixed(2)} </Text>
            </TouchableOpacity>


        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Pay')}>
                <Text style={styles.textedit}>Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Reload')} >
                <Text style={styles.textedit}>Reload</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Give')}>
                <Text style={styles.textedit}>Transfer</Text>
            </TouchableOpacity>
        </View>
    </View>

    <TouchableOpacity onPress={_getHistory}>
        <Text style={{borderBottomWidth:0.8,
            width:wp('95%'),
            marginVertical:20,
            paddingBottom:3, 
            textAlign:"left", 
            fontWeight:"bold", 
            fontSize: 18, 
            color:'white'}}>
            Payment History
        </Text>
    </TouchableOpacity>

    </View>

    <TouchableWithoutFeedback onPress={()=>{}}>
        <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        />
    </TouchableWithoutFeedback>
    </ImageBackground>
</View>
)
    
}
export default Ewallet; 

const styles = StyleSheet.create({
header:{
    flexDirection:'row',
    width:wp('100%'), height:hp('8%'), backgroundColor:'#199591',
    shadowColor: "black",
    shadowOffset: {
        width: 5,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    alignItems:'center',
    paddingHorizontal:22
    },
    classtext:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#ffffff",
},
container:{
    flexDirection:'row',

},
container2:{
    alignItems:'center',
    borderWidth:1,
    borderRadius:5,
        borderColor:"black",
        height:hp('30%'), width:wp('95%'),
        marginVertical:25,
        
        
},
textedit:{ 
    borderColor:'#595959',
    textAlign:"center",
    borderWidth:1,
    borderRadius:20,
    backgroundColor:"silver",
    width:wp('26%'),
    paddingHorizontal:5,
    paddingVertical:4,
    marginVertical:5,
    marginHorizontal:8, 
    fontWeight:'900',
    color:'#595959', fontSize:20

    },

    item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    },
    title: {
    fontSize: 32,
    },

})
