import Personnage from "./Personnages/Personnage.ts"
import Augmentor from "./Personnages/Monstres/Augmentor.ts"
import AraignéeVenimeuse from "./Personnages/Monstres/AraignéeVenimeuse.ts"
import Boss from "./Personnages/Monstres/Boss.ts"
import MiniTroll from "./Personnages/Monstres/MiniTroll.ts"
import Phantome from "./Personnages/Monstres/Phantome.ts"
import JeuxManagement from "./JeuxManagement.ts"
import Mage from "./Personnages/Aventuriers/Mage.ts"

export default class Combat {
    aventuriers : Personnage[]
    monstres : Personnage[]
    ordre : Personnage[]
    aventuriersMort : Personnage[]
    monstresMort : Personnage[]
    toutPersonnages : Personnage[]

    constructor(boss? : Personnage[]) {
        this.aventuriers = JeuxManagement.game.aventuriers
        this.monstres = boss || this.créationMonstres()
        this.ordre = this.getOrder(this.aventuriers.concat(this.monstres))
        this.aventuriersMort = []
        this.monstresMort = []
        this.toutPersonnages = this.aventuriers.concat(this.aventuriersMort.concat(this.monstres.concat(this.monstresMort)))
    }

    débutCombat() : Personnage[] {
        console.log("Le combat à commencé")
        console.log("Voici la liste des monstres")
        for (let monstre of this.monstres) {
            console.log(`${monstre.className}`)
        }
        console.log("Le combat commence maintenant")
        let tour = 1
        while (this.aventuriers.length > 0 || this.monstres.length > 0) {
            console.log(`Tour ${tour}`)
            tour++
            console.log(`C'est à ${this.ordre[0].className} de jouer`)
            this.statistiques(this.ordre[0])
            this.ordre[0].Tour(this.aventuriers, this.monstres)
            if (this.ordre[0].HpActuel == 0) {
                this.aventuriersMort.push(this.ordre[0])
                this.siPersonnagesMort()
                this.ordre.changement()
            } else {
                for (let i =0;i<this.ordre.length;i++){
                    if (i==0){
                        this.ordre[i].Positionnement=0
                    } else {
                        this.ordre[i].Positionnement += (this.ordre[i].vitesse)
                    }
                }
                this.ordre=this.getOrder(this.ordre)
            }
        }
        console.log("Le combat est terminer")
        return this.aventuriers, this.aventuriersMort
    }

    getOrder(orderList : Personnage[]) : Personnage[] {
        orderList.sort((a, b) => b.Positionnement - a.Positionnement)
        return orderList
    }

    créationMonstres() : Personnage[] {
        let monstres : Personnage[] = []
        const listeMonstres = [AraignéeVenimeuse,Boss,MiniTroll,Phantome]
        for (let i=1; i <= 3; i++) {
            monstres.push(new listeMonstres[Math.floor(Math.random() * 5)]())
        }
        return monstres
    }

    siPersonnagesMort() {
        for (let i = 0; i < this.aventuriers.length; i++) {
            if (this.aventuriers[i].HpActuel == 0){
                this.aventuriersMort.push(this.aventuriers[i])
                this.aventuriers.splice(i, 1)
            }
        }
        for (let i=0;i<this.monstres.length;i++){
            if (this.monstres[i].HpActuel <= 0){
                this.monstresMort.push(this.monstres[i])
                this.monstres.splice(i,1)
            }
        }
    

    statistiques(personnage : Personnage) {
        console.log(
            `Personnage Statistiques : ${personnage.className} \n
            ---------------------------------\n
            Attaque : ${personnage.attaque}\n
            Defence : ${personnage.defense}\n
            Vtesse : ${personnage.vitesse}\n
            Max HP : ${personnage.maxHp}\n
            Hp Actuel : ${personnage.HpActuel}\n`)
        if (personnage instanceof Mage){
            console.log(`
            Max Mana : ${personnage.manaActuel}\n
            Actuel Mana : ${personnage.manaActuel}\n`)
        }
    }
}
