export class Utility{
    errorMessage = ( error : any, location : string )=>{
        console.log(`Error ${ location }: ${ error }`);
    }
}