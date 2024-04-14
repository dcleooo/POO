import Personnage from "../Personnage.ts";
import Menu from "../../Menu.ts";
import Monstre from "../Monstre.ts";
import Inventaire from "../../Inventaire.ts";
import Aventurier from "../Aventurier.ts";
import { ObjectReturn } from "../objectReturn.ts";


export default class Voleur extends Aventurier{
    className:string="Voleur";
    Positionnement: number=this.vitesse;
    constructor(attaque : number = 6, 
                defense : number = 5, 
                vitesse : number= 10, 
                HpMax :number= 35
                ){
        super(attaque,defense,vitesse,HpMax)
    }

    AttaqueSpéciale(ennemi:Personnage):object{
            let voleObjet : string | null
            let stealNumber : number = Math.floor(Math.random() * 100);
            if (stealNumber<5){
                voleObjet = "demi-étoile"
                Inventaire.inventory.nDemiÉtoile+=1
            } else if(5<=stealNumber && stealNumber<20) {
                voleObjet = "fragment d'étoile"
                Inventaire.inventory.nFragmentÉtoile+=1
            } else if (60<=stealNumber && stealNumber<90){
                voleObjet = "potion"
                Inventaire.inventory.nPotions+=1
            } else if (90<=stealNumber){
                voleObjet = "ether"
                Inventaire.inventory.nEthers+=1
            } else {
                voleObjet = null
            }
            return {play:true,voleObjet:voleObjet}
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
                }
                break

            case 1:
                menu = new Menu("Qui veux-tu attaquer ?", Inventaire.inventory.listeNomPersonnage(monstres))
                choice = menu.input()
                if (choice===undefined){
                    console.log("Tu ne peux pas faire ce choix, choisi un autre choix")
                    this.Tour(aventuriers,monstres)
                }else{
                    let action:ObjectReturn=this.AttaqueSpéciale(monstres[choice])
                    if (action['voleObjet']===null){
                        console.log(`Tu n'as rien réussi à voler`)
                    } else {
                        console.log`Tu as volé cet object : ${action['object']}.`
                    }
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