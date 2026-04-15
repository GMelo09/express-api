let nome: string;
let idade: number;
let cadastrado: boolean;
let meses: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let estadoBR: string[] = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SE", "SP", "TO"];


type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

const user1: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    createdAt: new Date(),
    updatedAt: new Date(),
};


const user2: User = {
    id: 2,
    name: "Maria Doe",
    email: "maria@example.com",
    password: "password12356464",
    createdAt: new Date(),
    updatedAt: new Date(),
};  


interface Cliente {    
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}


const cliente1: Cliente = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    createdAt: new Date(),
    updatedAt: new Date(),
};





function cadastrarUser(user: User) {
    console.log(user);
}