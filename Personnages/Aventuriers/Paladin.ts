import Personnage from "../Personnage.ts";
import Menu from "../../Menu.ts";
import Monstre from "../Monstre.ts";
import Inventaire from "../../Inventaire.ts";
import Aventurier from "../Aventurier.ts";


export default class Paladin extends Aventurier{
    className:string="Paladin";
    Positionnement: number=this.vitesse;
    constructor(attaque : number = 6,
                defense : number = 8,
                vitesse : number= 4,
                HpMax :number= 60
                ){
        super(attaque,defense,vitesse,HpMax)
    }

    AttaqueSpéciale(ennemi:Personnage):object{
            this.dégâts(ennemi,0.4)
            return {play:true,stealObject:null} 
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
                monstres.pourTous(monstre=>{
                    this.AttaqueSpéciale(monstre)
                })
                console.log(`Tout les ennemis ont subis des dégâts.`)
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