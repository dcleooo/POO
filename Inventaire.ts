import Personnage from "./Personnages/Personnage.ts"
import Mage from "./Personnages/Aventuriers/Mage.ts"
import Menu from "./Menu.ts";
import JeuxManagement from "./JeuxManagement.ts";

export default class Inventaire {
    nPotions : number = 2;
    nFragmentÉtoile : number = 1;
    nDemiÉtoile : number = 0;
    nEthers : number = 1;
    static _Inventory : Inventaire | null = null

    constructor() {}

    static get inventory() {
        if(!this._Inventory) {
            this._Inventory = new Inventaire()
        }
        return this._Inventory
    }

    inventaireManagement() : boolean{
        let menu = new Menu("Que veux-tu utiliser ?",["Potion","Fragment d'étoile", "demi-étoile","Ether", "Quitter l'inventaire"])
        let choice = menu.input()
        switch (choice){
            case 0:
                menu = new Menu("Sur qui veux-tu l'utilsier ?",this.listeNomPersonnage(JeuxManagement.game.aventuriers))
                choice=menu.input()
                if(!this.utilisePotion(JeuxManagement.game.aventuriers[choice])){
                    this.inventaireManagement()
                }else{
                    return true
                }
            case 1:
                 menu = new Menu("Sur qui veux-tu l'utilsier ?",this.listeNomPersonnage(JeuxManagement.game.aventuriers))
                 choice=menu.input()
                 if(!this.utiliseFragmentÉtoile(JeuxManagement.game.aventuriers[choice])){
                    this.inventaireManagement()
                }else{
                    return true
                }
            case 2:
                menu = new Menu("Sur qui veux-tu l'utilsier ?",this.listeNomPersonnage(JeuxManagement.game.aventuriers))
                choice=menu.input()
                if(!this.utiliseDemiÉtoile(JeuxManagement.game.aventuriers[choice])){
                    this.inventaireManagement()
                }else{
                    return true
                }
            case 3:
                menu = new Menu("Sur qui veux-tu l'utilsier ?",this.listeNomPersonnage(JeuxManagement.game.aventuriers))
                choice=menu.input()
                if(!this.utiliseEther(JeuxManagement.game.aventuriers[choice])){
                    this.inventaireManagement()
                }else{
                    return true
                }
            case 4:
                return false
            default:
                console.log("Tu ne peux pas faire ce choix")
                this.inventaireManagement()
        }
        return true
    }

    utilisePotion(personnage : Personnage):boolean {
        if (this.nPotions <= 0){
            console.log('Tu as plus de potion')
            return false
        }else if (personnage.HpActuel==personnage.maxHp){
            console.log(`Le ${personnage.className} a trop de HP tu ne peux pas l'utiliser`)
            return false
        } else {
            personnage.soin(10)
            return true
        }
    }

    utiliseFragmentÉtoile(personnage : Personnage):boolean {
        if (this.nFragmentÉtoile <= 0){
            console.log('Tu as pas assez de fragment étoilé')
            return false
        }else if (personnage.HpActuel==personnage.maxHp){
            console.log(`Le ${personnage.className} a trop de HP tu ne peux pas l'utiliser`)
            return false
        } else {
            if (personnage.HpActuel <= 0){
                personnage.réanimation(20)
            } else {
                personnage.soin(20)
            }
            return true
        }
    }

    utiliseDemiÉtoile(personnage : Personnage):boolean {
        if (this.nDemiÉtoile <= 0){
            console.log('Tu as pas assez de demi étoile')
            return false
        }else if (personnage.HpActuel==personnage.maxHp){
            console.log(`Le ${personnage.className} a trop de HP tu ne peux pas l'utiliser`)
            return false
        } else {
            if (personnage.HpActuel <= 0){
                personnage.réanimation(50)
            } else {
                personnage.soin(50)
            }
            return true
        }
    }

    utiliseEther(personnage : Personnage):boolean {
        if (this.nEthers <= 0){
            console.log('Tu as pas assez ethers')
            return false
        } else if (personnage instanceof Mage && personnage.manaActuel==personnage.manaMax){
            console.log("Le mage a trop de mana tu ne peux pas l'utilser")
            return false
        } else if (personnage instanceof Mage){
            personnage.gainMana(4)
            return true
        } else {
            console.log("Tu ne peux pas utiliser ethers sur ce personnage")
            return false
        }
    }

    listeNomPersonnage(personnage:Personnage[]):string[]{
        let listeNom:string[]=[]
        personnage.pourTous(Element => {
            listeNom.push(Element.className)
        });
        return listeNom
    }
}