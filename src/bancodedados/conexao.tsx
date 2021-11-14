import * as SQLite from 'expo-sqlite';
export const Conexao={
    getConnection:()=>SQLite.openDatabase("bdApp.db"),
};