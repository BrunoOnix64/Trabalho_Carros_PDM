import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import CarroServico from '../servico/carro_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Carro } from '../modelo/Carro'


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.findAllCarro()
    }

    state = {
    carro:Carro,
    lista_array_dados_carro: [],
    value: null,
    Id_pesquisar: null,
    onChangeText: null,
    formularioId: null,
    formularioMarca_modelo: null,
    formularioCombustivel: null,
    formularioMunicipio: null
    }

    componentDidMount () {
    this.instanciarCarro();
    this.findAllCarro();
    }

    /*componentDidUpdate (prevProps, prevState) {
        if(prevState.lista_array_dados_carro !== this.state.lista_array_dados_carro){
            this.findAllCarro();
        }
    }*/

    findAllCarro=() => {
         CarroServico.findAll()
         .then((response: any) => {
             this.setState({
                 lista_array_dados_carro: response._array,
                 isLoading: false,
                })
            }), (error) =>{
             console.log(error);
            }
        }      

    deleteCarro=(id) => {
        this.findCarroById(id)
        if(this.state.formularioId != null || this.state.formularioId != undefined) {
            CarroServico.deleteById(id)
        Alert.alert("Registro de carro excluído com sucesso:")
        this.findAllCarro()
        }
    }

        atualizaCarro=(item0, item1, item2, item3) => {
            let carro = new Carro()
            carro.id = item0
            carro.marca_modelo = item1
            carro.combustivel = item2
            carro.municipio = item3

            

        CarroServico.updateByObjeto(carro).then((response: any) => {
            if(response._array.length >0 && response != null && response != undefined) {
                Alert.alert("Cadastro Atualizado!");
            }else{
                Alert.alert("Cadastro não encontrado!")
            }
            
            }), (error) => {
            console.log(error);
            }
            this.findAllCarro()
        }

        insertCarro=(item1, item2, item3) => {
            let carro = new Carro()
            carro.marca_modelo = item1
            carro.combustivel = item2
            carro.municipio = item3
        
        const insertId = CarroServico.addData(carro);
        if(insertId == null || insertId == undefined) {
            Alert.alert("Não foi possível inserir o novo carro!")
        }
            this.findAllCarro()
            return carro
        }
        
        instanciarCarro=() => {
            let carro: Carro = new Carro()
            return carro 
        }

        findCarroById=(id) => {
            CarroServico.findById(id)
            .then((response: any) => {
                if(response._array.length > 0 && response != null && response != undefined) {
                }else{
                    Alert.alert("Id não encontrado!")
                }
            }), (error) => {
                console.log(error);
            }
        }

        localizaCarro=(id) => {
            CarroServico.findById(id)
            .then((response: any) => {
            let carropesquisa:Carro = new Carro()
            if(response._array.length > 0 && response != null && response != undefined) {
                
                const carroretorno = response._array.map((item, key) => {
                carropesquisa.id = item.id;
                carropesquisa.marca_modelo = item.marca_modelo;
                carropesquisa.combustivel = item.combustivel;
                carropesquisa.municipio = item.municipio;
            })
        
        this.setState({
            carro: carropesquisa,
            formularioId: carropesquisa.id,
            formularioMarca_modelo: carropesquisa.marca_modelo,
            formularioCombustivel: carropesquisa.combustivel,
            formularioMunicipio: carropesquisa.municipio
        })
        
            }else{
                Alert.alert("ID de carro não foi possível de ser localizado!")
            }
        }), (error) => {
            console.log(error);
        }
        }

        render() {
            const {carro, lista_array_dados_carro, value, Id_pesquisar, formularioId, formularioMarca_modelo, formularioCombustivel, formularioMunicipio} = this.state;
            
            const carroList = lista_array_dados_carro.map((item, key) => {
                
            return(
                <>
                    <Text key={key}>id:{item.id} marca_modelo:{item.marca_modelo} combustivel:{item.combustivel} municipio:{item.municipio}</Text>
                </>
            )
        })

            return(
                    
                <View style={styles.container}>
                    <Text style={{ fontSize: 20, paddingBottom: 20}}> Crud de Carros</Text>

                    <TextInput 
                        placeholder="Digite o Id de carro a ser pesquisado"
                        style={styles.textInput}
                        onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                        value={Id_pesquisar}
                    />

                    <Text>{formularioId}</Text>

                    <TextInput
                        placeholder="Digite a marca/modelo do novo carro"
                        style={styles.textInput}
                        onChangeText={formularioMarca_modelo => { this.setState({ formularioMarca_modelo: formularioMarca_modelo }) }}
                        value={formularioMarca_modelo}
                    />

                    <TextInput
                        placeholder="Digite o tipo de combustível do carro"
                        style={styles.textInput}
                        onChangeText={formularioCombustivel => { this.setState({ formularioCombustivel: formularioCombustivel}) }}
                        value={formularioCombustivel}
                    />

                    <TextInput
                        placeholder="Digite o município do veículo"
                        style={styles.textInput}
                        onChangeText={formularioMunicipio => { this.setState({ formularioMunicipio: formularioMunicipio}) }}
                        value={formularioMunicipio}
                    />

                    <View style={styles.containerTouch}>
                        <TouchableOpacity onPress={() => { formularioMarca_modelo == null ? Alert.alert("O campo de marca/modelo não pode ser vazio!") :this.insertCarro(formularioMarca_modelo, formularioCombustivel, formularioMunicipio)}} style={{ alignItems: "center", backgroundColor: 'skyblue' }}>
                            <Icon name="md-add" size={30} color="black"/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTouch}>
                        <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("Sem objeto para atualizar, realize uma pesquisa!") :this.atualizaCarro(formularioId, formularioMarca_modelo, formularioCombustivel, formularioMunicipio)}} style={{ alignItems: "center", backgroundColor: 'skyblue' }}>
                            <Icon name="md-refresh" size={30} color="black"/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTouch}>
                        <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de Id não pode estar vazio!") :this.localizaCarro(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'skyblue' }}>
                            <Icon name="md-search" size={30} color="black"/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTouch}>
                        <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de Id não pode estar vazio!") :this.deleteCarro(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'skyblue' }}>
                            <Icon name="md-remove" size={30} color="black"/>
                        </TouchableOpacity>
                    </View>
                    {carroList}
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput:{
        alignItems: "center",
        width: 200,
        height:40,
        borderColor: 'gray',
        borderWidth: 1
    },

    containerTouch:{
        width: 200,
        padding: 10
    }
});











