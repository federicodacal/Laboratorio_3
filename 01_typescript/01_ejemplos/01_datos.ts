//EJEMPLOS DE TIPOS DE DATOS
var esVerdad : boolean =  true;
//esVerdad = 0; // Type number is not assignable to type boolean
//esVerdad = "false"; // Type string is not assignable to type boolean

// Type number
var entero : number = 1;
var decimal : number = 10.59;
var hexa : number = 0xFF55AA;
var binario : number = 0b1001001;
var octal : number = 0o7125;

//var obj : object = null; // ERROR SI ES ESTRICTO. Type null is not assignable to type object
var obj : object | null = null;

var indefinido : number;
//console.log(indefinido); //ERROR SI ES ESTRICTO. Variable 'indefinido' is used before assigned.

var cosa : any = "algo";
cosa = 10;
cosa = true;

var cadena : string = "hola";
console.log(cadena);
var otraCadena : string = 'mundo';
console.log(otraCadena);
var masCadenas : string = `con tilde invertido!`;
console.log(masCadenas);

var template : string = `concatenando: ${cadena} ${otraCadena}. Valor: ${hexa}.`;
console.log(template);

/*! CON ESTE FORMATO SE VERAN LOS COMENTARIOS EN .JS*/