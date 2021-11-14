import { Carro } from "../modelo/Carro";
import { Conexao } from "../bancodedados/conexao";
import { SQLError } from "expo-sqlite";

const table = "carro"
const db = Conexao.getConnection()

export default class CarroServico{
    
    static addData(param: Carro){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO ${table} (marca_modelo, combustivel, municipio)
                values (?, ? , ?)`,
                [param.marca_modelo, param.combustivel, param.municipio],
                (_,{ insertId, rows }) => {
                    console.log("id insert "+ insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    static deleteById(id: number){
        db.transaction(
            tx => {
                tx.executeSql(`DELETE FROM ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) =>{
                    console.log(sqlError);
                }}, (txError) => {
                    console.log(txError);
                });
            }

    static updateByObjeto(param: Carro){
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`UPDATE ${table} set marca_modelo = ?, combustivel = ?, municipio = ? where id = ?;`, 
            [param.marca_modelo, param.combustivel, param.municipio, param.id], () => {
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
                console.log(txError);
            }));
    }

    static findById(id: number){
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
                console.log(txError);
            }));
    }

    static findAll(){
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
                console.log(txError);
            }));
    }
}