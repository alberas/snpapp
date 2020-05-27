import React, { useState, useEffect } from 'react';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import { TouchableOpacity, Image, Text, View, Dimensions, Alert, Linking } from 'react-native';

import Close from '../assets/icons/ic_close.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import DefaultButton from './components/DefaultButton/DefaultButton';
import { connect, useSelector } from 'react-redux';
import { retornaDadosPromocao  } from './api/evento';
import { gerarVoucher  } from './api/evento';


const w = Math.round(Dimensions.get('window').width);


const fnGerarVoucher = (isTermAccepted, idEvento, idUsuario) => {
    if(!isTermAccepted){
        Alert.alert("Sinapse", "Aceite os termos para prosseguir");
        return false;
    }

    gerarVoucher(idEvento, idUsuario)
    .then(
        x => {
            if(x.ErrorCode > 0){
                Alert.alert("Sinapse", x.ErrorMsg);
            }else{
                Alert.alert("Sinapse", "Seu voucher foi gerado com sucesso: " + x.Data.Voucher);
                navigate('Descontos', {activeScreen: 2});
            }
        }
    );
}


const DescontoDetalhe = (props) => {
    
    const {navigate, getParam, goBack} = props.navigation;
    const [isLoading, setIsLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [isTermAccepted, setTermAccepted] = useState(false);
    const usuario = useSelector(state =>  state.usuario);
    
    const id = getParam("id");
    

    useEffect(() => {
        (async () => {
            retornaDadosPromocao(id)
            .then(
                x => {
                    setDataSource(x.Data);
                }
            )
          setIsLoading(false);
        })();
    }, []);

      

    return (
        <BackgroundImage>
            <ScrollView>
                <View style={{width: w, height: 220, backgroundColor: "rgba(184,222,241,1)"}}>
                    <LinearGradient
                            colors={['rgba(184,222,241,0.5)', 'transparent']}
                            start={[1,1]}
                            end={[0,1]}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: 220,
                                justifyContent: "center"
                            }}
                            >
                            <TouchableOpacity onPress={() => goBack()} style={{position: "absolute", right: 10, top: 10}}>
                                <Close width={20} height={20}/>
                            </TouchableOpacity>
                        <Text style={{fontSize: 30, textAlign: "center", color: "rgba(124,27,73,1)"}}>{dataSource.descricao}</Text>
                    </LinearGradient>
            </View>

            <View style={{ flexDirection: "row"}}>
                <View style={{width:60, height: 60, borderWidth: 1, margin: 10, borderRadius: 10, borderColor: "#F3F3F3"}}>
                </View>
                <View style={{justifyContent: "space-between", height: 60, marginTop: 10}}>
                    <Text style={{color: "#F25C5C", fontSize: 25, fontWeight: "bold"}}>{dataSource.titulo}</Text>
                    <Text style={{color: "#242424", fontSize: 14, fontWeight: "bold"}}>Expira em {dataSource.dt_validade}</Text>
                </View>
            </View>

            <View style={{borderWidth: 1,
                borderTopRightRadius: 46,
                borderColor: '#0000000D',
                borderBottomWidth: 0,
                borderLeftWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: 1,
                width: w,
                backgroundColor: "#fff", 
                padding: 10,
                marginTop: 10,
                paddingTop: 20}}>
                <View>
                    <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 10, color:"#242424"}}>Termos & condições</Text>
                    <Text style={{color:"#616161B3"}}>{dataSource.descricao}</Text>
                </View>
            </View>

        </ScrollView>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 5}}>
            {usuario!=null && usuario.id > 0 ? 
                <View>
                    <View style={{flexDirection: "row", paddingBottom: 5}}>
                        <TouchableOpacity onPress={() => setTermAccepted(!isTermAccepted)} 
                            style={{borderWidth: 1, borderRadius: 5, borderColor: "#F3F3F3", width: 20, height: 20, marginRight: 5, justifyContent: "center", alignItems: "center"}}>
                                {isTermAccepted ?
                                <Close width={15} height={15}/>
                                :
                                null}
                        </TouchableOpacity>
                        <Text style={{color:"#616161", fontWeight: "bold", fontSize: 15}}>Aceitar termos e condições.</Text>
                    </View>
                    <DefaultButton onPress={() => fnGerarVoucher(isTermAccepted,id, props.usuario.id)} label="Pegar voucher"/>
                </View>
            :
                <View>
                    <View style={{ backgroundColor: "#616161",  padding: 10, marginBottom: 10, borderRadius: 5}}>
                        <Text style={{textAlign:"center",color: "#fff",}}>Para pegar esse voucher você precisa estar autenticado</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                        <TouchableOpacity onPress={() => navigate("Login")}>
                            <Text style={{color: "#242424", fontSize: 13, fontWeight: "bold", padding: 10}}>Autentique-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate("Cadastro")}>
                            <Text style={{color: "#242424", fontSize: 13, fontWeight: "bold", padding: 10}}>Registre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
        </BackgroundImage>
    )
    
}

DescontoDetalhe.navigationOptions = ({navigation}) => ({
    headerShown: false
});


const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DescontoDetalhe);