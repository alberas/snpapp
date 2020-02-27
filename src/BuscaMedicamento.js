import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import Loader from './Loader';
import  * as colors from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';
import Medicamento from './components/Medicamento/Medicamento';
import { Icon } from 'native-base';

class BuscaMedicamento extends React.Component{

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => <AppLogo />,
            headerLeft: () => {
                return (<Icon name="arrow-back" onPress={() => navigation.goBack()} style={{margin: 5}}/>)
            },
            headerStyle: {
                backgroundColor: colors.HEADER_BACKGROUND_COLOR,
            },
            headerTintColor: colors.HEADER_FONT_COLOR,
            headerTitleStyle: {
                fontWeight: 'bold',
                color: colors.HEADER_FONT_COLOR
            }
        }
    };

    constructor(props){
        super(props);
        this.state = { isLoading: true}
    }

   
   
    componentDidMount(){
        
        return fetch("http://www.snpmed.com.br/api/medicamento?q=" + this.props.navigation.getParam('termo'))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.Data,
                    }, 
                    function(){
                        
                    }
                );

            })
            .catch((error) =>{
                console.error(error);
            });
    }

   
    render(){
        if(this.state.isLoading){
            return(
                <Loader/>
            );
        }
        return(
            <ScrollView>
                {
                (this.state.dataSource.length > 0) ?
                this.state.dataSource.map(t=>(
                    <Medicamento key={t.id} object={t} navigation={this.props.navigation}/>
                    )
                )
                :
                (<Text style={{alignSelf: "center", fontSize: 20, padding: 10}}>Não foram encontrados medicamentos para o termo informado.</Text>)
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
    inputStyle:{
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        flex: 8
    },
    icon: {
        flex: 2
    }
  });

  export default BuscaMedicamento;