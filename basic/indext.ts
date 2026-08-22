function suma_2(a: number, b: number): number {
  return a + b;
}

const resultado_suma_2 = suma(5,5)

console.log(resultado_suma)

type Rol= "admin" | "guest" | "user"

interface User {
    name: string;
    id: string | number;
    age: number;
    discount?: number //? significa opcional
    subjects: string[]
    print: Function
    rol: Rol
}

const user1: User = {
    id: 1,
    rol: "admin",
    name: "Mari",
    age: 19,
    subjects: ["si"],
    print: () => {

    }

}

console.log(user1)

class Employment {
    private name: string;
    private company: string;
    
    constructor(name: string, company: string) {
        this.name = name 
        this.company = company
    }

}

const employment1 = new Employment("Mari", "Si")

console.log(employment1)