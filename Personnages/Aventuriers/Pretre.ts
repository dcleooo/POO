import Personnage from "../Personnage.ts";
import Menu from "../../Menu.ts";
import Monstre from "../Monstre.ts";
import Inventaire from "../../Inventaire.ts";
import Aventurier from "../Aventurier.ts";
import { ObjectReturn } from "../objectReturn.ts";


export default class Pretre extends Aventurier{
    className:string="Pretre";
    Positionnement: number=this.vitesse;
    constructor(attaque : number = 5,
                defense : number = 3,
                vitesse : number= 9,
                HpMax :number= 30
                ){
        super(attaque,defense,vitesse,HpMax)
    }

    attaqueSpéciale(allié : Personnage):ObjectReturn{
        allié.soin(15)
    return {play:true,object:allié.className}
}

    Tour(aventuriers:Aventurier[],monstres:Monstre[]){
        let menu = new Menu("Que veux-tu faire ?", ["Attaque de base","Attaque spécial","Inventaire"])
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
                menu = new Menu("Qui veux-tu soigner ?", Inventaire.inventory.listeNomPersonnage(aventuriers))
                let numberPlayer = menu.input()
                if (numberPlayer===undefined){
                    console.log("Tu ne peux pas faire ce choix, choisi un autre choix")
                    this.Tour(aventuriers,monstres)
                }else{
                    let action:object=this.attaqueSpéciale(aventuriers[numberPlayer])
                    console.log(`Tu as soigner le ${action[1]}.`)
                }
                break

            case 2:
                if(!Inventaire.inventory.ManageInventaire()){
                    this.Tour(aventuriers,monstres)
                }
                break

            default:
                console.log("Tu ne peux pas faire ce choix, choisi un autre chose")
                this.Tour(aventuriers,monstres)
                
        }
    }
}