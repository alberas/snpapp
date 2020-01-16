import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';

class Farmacia extends React.Component{


    render(){


        var dados = this.props.dados;

        if(!dados){
            return (
                <View/>
            );
        }

        return (
            <ScrollView>
            {
            this.props.dados.map(t=>(
                <View key={t.id}
                    style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}
                    >
                    <View style={{flex: 2}}>
                        <Text>{t.name}</Text>
                        <Text>{t.vicinity}</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center'}} >
                            <Icon name="navigate"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center'}}>
                            <Icon name="person"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center'}} >
                            <Icon name="star-half"/>
                        </TouchableOpacity>
                    </View>
                </View>
                )
            )
            }
            </ScrollView>
        );
    }
}

const style = {
    
}


export default Farmacia;