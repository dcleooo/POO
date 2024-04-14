import Personnage from "../Personnage.ts";
import Menu from "../../Menu.ts";
import Monstre from "../Monstre.ts";
import Inventaire from "../../Inventaire.ts";
import Aventurier from "../Aventurier.ts";


export default class Guerrier extends Aventurier{
    className:string="Guerrier";
    Positionnement: number=this.vitesse;
    constructor(attaque : number = 7, 
                defense : number = 7, 
                vitesse : number= 5, 
                HpMax :number= 50
                ){
        super(attaque,defense,vitesse,HpMax)
    }

    Tour(aventuriers:Aventurier[],monstres:Monstre[]){
        let menu = new Menu("Que veux-tu faire ?", ["Attaque de base","Inventaire"])
        let choice=menu.input()
        switch (choice){
            case 0:
                menu = new Menu("Qui veux-tu attaquer ?", Inventaire.inventory.listeNomPersonnage(monstres))
                choice = menu.input()
                if (choice===undefined){
                    console.log("Tu ne peux pas faire ce choix, choisi un autre choix")
                    this.Tour(aventuriers,monstres)
                }else{
                    this.dégâts(monstres[choice])
                    console.log(`Tu as mis des dégâts à ${monstres[choice].className}.`)
                    //if (monstres[choice].className==="augmentor"){  Si je creer un mechant qui rend les degats qu'il a subi
                    //    monstres[choice].damageReceve()
                    //}
                }
                break

            case 1:
                if(!Inventaire.inventory.ManageIventaire()){
                    this.Tour(aventuriers,monstres)
                }
                break

            default:
                console.log("Tu ne peux pas faire ce choix, choisi un autre chose")
                this.Tour(aventuriers,monstres)
                
        }
    }
}