import Personnage from "../Personnage.ts";
import Menu from "../../Menu.ts";
import Monstre from "../Monstre.ts";
import Inventaire from "../../Inventaire.ts";
import Aventurier from "../Aventurier.ts";
import { ObjectReturn } from "../objectReturn.ts";

export default class Mage extends Aventurier{
    className:string="Mage";
    Positionnement: number=this.vitesse;
    manaActuel : number;
    manaMax : number;
    constructor(attaque : number = 4, 
                defense : number = 3, 
                vitesse : number= 8, 
                maxHp :number= 20,
                manaMax : number= 10
                ){

        super(attaque,defense,vitesse,maxHp)
        this.manaMax = manaMax
        this.manaActuel = manaMax
    }

    gainMana(percent : number){
        this.manaActuel += (this.manaMax*(percent/10))
        if (this.manaActuel > this.manaMax) this.manaActuel = this.manaMax
    }

    attaqueSpécial(ennemi : Personnage) : ObjectReturn{
        if (this.manaActuel - (this.manaMax*(4/10))>= 0){
            this.manaActuel -= (this.manaMax*(4/10))
            ennemi.HpActuel -= this.attaque
            return {play:true,NomMonstre:ennemi.className}
        }
        return {play:false,object:null}
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
                    this.gainMana(2)
                    this.dégâts(monstres[choice])
                    console.log(`Tu as mis des dégâts à ${monstres[choice].className}.`)
                }
                break

            case 1:
                menu = new Menu("Qui veux-tu attaquer ?", Inventaire.inventory.listeNomPersonnage(monstres))
                choice = menu.input()
                if (choice===undefined){
                    console.log("Tu ne peux pas faire ce choix, choisi un autre chose")
                    this.Tour(aventuriers,monstres)
                }else{
                    let action:ObjectReturn =this.AttaqueSpéciale(monstres[choice])
                    if (action['joue']===true){
                        console.log(`Tu as mis des dégâts à ${monstres[choice].className}.`)
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
        this.gainMana(2)
    }
}