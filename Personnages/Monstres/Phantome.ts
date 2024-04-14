import Personnage from "../Personnage.ts";
import Monstre from "../Monstre.ts";
import Aventurier from "../Aventurier.ts";

export default class AraignéeVenimeuse extends Monstre{
    className:string="AraignéeVenimeuse";
    Positionnement:number=this.vitesse;

    constructor(attaque : number = 4,
                defense : number = 5,
                vitesse : number= 10,
                maxHp :number= 20
                ){
        super(attaque,defense,vitesse,maxHp)
    }

    Tour(aventuriers:Aventurier[],_monstres:Monstre[]){
        let personnageCiblé : Personnage = aventuriers[0]
        const whichEnnemi :number = Math.floor(Math.random() * 10)
        if (whichEnnemi>3 && whichEnnemi<6){
            personnageCiblé = this.aventurierAvecLeMoinsDeHp(aventuriers)
        } else {
            personnageCiblé = aventuriers[Math.floor(Math.random() * aventuriers.length)]
        }
        this.dégâts(personnageCiblé)
        console.log(`${this.className} a mis des dégâts à ${personnageCiblé.className}:`+(this.attaque - personnageCiblé.defense)+".")
    }
}