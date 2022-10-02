namespace Entidades 
{
    export abstract class Persona 
    {
    private nombre : string;
    private apellido : string;
    private dni : number;
    private sexo : string;

    public constructor(nombre:string, apellido:string, dni:number, sexo:string)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.sexo = sexo;
    }

    public get Apellido() : string
    {
        return this.apellido;
    }

    public get Nombre() : string
    {
        return this.nombre;
    }

    public get Dni() : number
    {
        return this.dni;
    }

    public get Sexo() : string
    {
        return this.sexo;
    }

    public abstract Hablar(idioma : string) : string;

    public ToString() : string
    {
        return `${this.nombre} ${this.apellido}. DNI: ${this.dni} - Sexo: ${this.sexo}`;
    }
    
    }
}
