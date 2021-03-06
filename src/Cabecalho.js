import React from 'react';
import { Icon, Left, Button, Body, Title, Right, Header } from 'native-base';

class Cabecalho extends React.Component{

    render(){
        return(

            <Header
                searchBar={true}
                rounded={true}
                >
                <Left>
                    <Button 
                        transparent
                        >
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.titulo}</Title>
                </Body>
                <Right>
                    <Button transparent
                        >
                        <Icon name='menu' />
                    </Button>
                </Right>
                
            </Header>
        );
    }
}




export default Cabecalho;