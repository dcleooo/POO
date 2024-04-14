import Personnage from "../Personnage.ts";
import Menu from "../../Menu.ts";
import Monstre from "../Monstre.ts";
import Inventaire from "../../Inventaire.ts";
import Aventurier from "../Aventurier.ts";


export default class Barbare extends Aventurier{
    className:string="Barbare";
    Positionnement: number=this.vitesse;
    constructor(attaque : number = 8, 
                defense : number = 3, 
                vitesse : number= 6, 
                HpMax :number= 40
                ){
        super(attaque,defense,vitesse,HpMax)
    }

    AttaqueSpéciale(ennemi:Personnage):object{
        if (this.HpActuel- (this.HpMax*(20/100)) > 0){
            this.HpActuel -= (this.HpMax*(20/100))
            this.dégâts(ennemi,1.3)
            return {play:true,nomMonstre:ennemi.className}
        }
        return {play:false,stealObject:null}
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
                menu = new Menu("Qui veux-tu attaquer ?", Inventaire.inventory.listeNomPersonnage(monstres))
                choice = menu.input()
                if (choice===undefined){
                    console.log("Tu ne peux pas faire ce choix, choisi un autre chose")
                    this.Tour(aventuriers,monstres)
                }else{
                    let action:object=this.AttaqueSpéciale(monstres[choice])
                    if (action['joue']===true){
                        console.log(`Tu as mis des dégâts à ${monstres[choice].className}.`)
                        // if (monstres[choice].className==="augmentor"){  Pareil qu'au dessus
                        //    monstres[choice].damageReceve()
                        //}
                    } else {
                        console.log("Tu ne peux pas faire ça car ton personnage n'a pas assez de vie")
                        this.Tour(aventuriers,monstres)
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