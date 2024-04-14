import Personnage from "./Personnages/Personnage.ts"
import Menu from "./Menu.ts"
import Guerrier from "./Personnages/Aventuriers/Guerrier.ts"
import Mage from "./Personnages/Aventuriers/Mage.ts"
import Paladin from "./Personnages/Aventuriers/Paladin.ts"
import Barbare from "./Personnages/Aventuriers/Barbare.ts"
import Pretre from "./Personnages/Aventuriers/Pretre.ts"
import Voleur from "./Personnages/Aventuriers/Voleur.ts"
import Inventaire from "./Inventaire.ts"
import Combat from "./Combat.ts"
import Aventurier from "./Personnages/Aventurier.ts"
import Zombie from "./Personnages/Monstres/Zombie.ts"

export default class JeuxManagement {
    static _game : JeuxManagement | null = null;
    aventuriers : Personnage[] = [];
    aventuriersMort : Personnage[] = [];

    static get game() {
        if (!this._game) {
            this._game = new JeuxManagement()
        }
        return this._game
    }

    constructor() {}

    commencement(){
        console.log("Le jeu commence")
        this.aventuriers=this.créationÉquipe()
        console.log("Voici le premier combat")
        this.aventuriers, this.aventuriersMort = new Combat().débutCombat()
        console.log("Voici la première salle des coffres")
        this.salleDesCoffres()
        console.log("Voici le deuxième combat")
        this.aventuriers, this.aventuriersMort = new Combat().débutCombat()
        console.log("Voici la deuxième salle des coffres")
        this.salleDesCoffres()
        console.log("Voici le boss final")
        let boss = [new Malphas()]
        this.aventuriers, this.aventuriersMort = new Combat(boss).débutCombat()

    }
    
    créationÉquipe() : Personnage[] {
        let équipeAventurier : Personnage[] = []
        const options = [Guerrier, Mage, Paladin, Barbare, Pretre, Voleur]
        for (let i=1; i <= 3; i++) {
            const answer = new Menu(`Choisi la classe des aventuriers ${i}`,["Guerrier", "Mage", "Paladin", "Barbare", "Pretre", "Voleur"]).input()
            équipeAventurier.push(new options[answer]())
        }
        return équipeAventurier
    }

    salleDesCoffres(){
        let menu = new Menu("Veux-tu ouvrir un coffre ?", ["Ouvrir le coffre", "Ne pas ouvrir le coffre et partir", "Quitter"])
        let choice = menu.input()
        if (choice == 1){
            let probabilitéPiège : number = Math.floor(Math.random() * 100)
            if (probabilitéPiège < 30) {
                for (let i=0; i<this.aventuriers.length; i++) {
                    let dégâts : number = Math.floor(Math.random() * 100)/2
                    this.aventuriers[i].HpActuel -= (this.aventuriers[i].maxHp*dégâts - this.aventuriers[i].defense)
                    if (this.aventuriers[i].HpActuel < 0) {
                        this.aventuriers[i].HpActuel = 0
                    }
                }
                this.siPersonnagesMort()
            } else {
                let stealObject : string | null
                let stealNumber : number = Math.floor(Math.random() * 100)
                if (stealNumber<5){
                    stealObject = "demi-étoile"
                } else if(5<=stealNumber && stealNumber<20) {
                    stealObject ="fragment d'étoile"
                } else if (60<=stealNumber && stealNumber<90){
                    stealObject = "potion"
                } else if (90<=stealNumber){
                    stealObject = "ether"
                } else {
                    stealObject = null
                }
            }
        }        
    }

    siPersonnagesMort() {
        for (let i = 0; i < this.aventuriers.length; i++) {
            if (this.aventuriers[i].HpActuel <= 0){
                console.log(`${this.aventuriers[i].className} est mort`)
                this.aventuriersMort.push(this.aventuriers[i])
                this.aventuriers.splice(i, 1)
            }
        }
    }

}