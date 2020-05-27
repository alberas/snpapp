import React from 'react';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

const db = SQLite.openDatabase("SNPMED.db", 2);

class AgendamentoDAO extends React.Component{


    constructor(props){
        super(props);
        this.criarTabela();
    }

    criarTabela = () => {
        //const sql = "DROP TABLE IF EXISTS agendamento";
        const sql = "CREATE TABLE IF NOT EXISTS agendamento(id integer primary key not null, id_medicamento, nome_medicamento, qtd_dose, tipo_dose, qtd_intervalo, tipo_intervalo)";
        db.transaction(tx => {
            tx.executeSql(sql,
            [],
            null,
            (tx, error) => { 
                console.log(error);
            }
            );
        },
        error => {
            console.log(error);
        },
        () => {
            
        });
    }

    inserir = (params, callback, errorCallBack) => {
        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO agendamento(id, id_medicamento, nome_medicamento, qtd_dose, tipo_dose, qtd_intervalo, tipo_intervalo) VALUES(null, ?, ?, ?, ?, ?, ?)",
                    params,
                    (tx, result) => {
                    },
                    (tx, error) => {
                    }
                );
            },
            error => {
                errorCallBack(error);
            },
            () => {
                callback();
            }
        );
    }

    retornaAgendamentos = (callback, errorCallBack) =>{
        var retorno = [];

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM agendamento",
                    [], 
                    (_, {rows}) => {
                        retorno = [...rows._array];
                    },
                    (_, erro) =>  {
                    }
                );
            },
            error => {
                errorCallBack(error);
            },
            () => {
                callback(retorno);
            }
        );
        
    }

    excluir = (id, callback) => {
        db.transaction(
            tx => {
                tx.executeSql("DELETE FROM agendamento WHERE id = ?", [id],
                (tx, result) => {
                },
                (tx, error) => {
                }
            )
            },
            error => {
                errorCallBack(error);
            },
            () => {
                callback();
            }
        )
    }
}


export default AgendamentoDAO;