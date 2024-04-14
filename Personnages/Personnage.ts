export default abstract class Personnage {
    attaque : number; 
    defense : number;
    vitesse : number; 
    maxHp : number;
    HpActuel : number;
    className:string=""
    Positionnement :number=0;

    constructor(attaque : number, defense : number,vitesse : number, maxHp : number){
        this.attaque = attaque;
        this.defense = defense;
        this.vitesse = vitesse;
        this.maxHp = maxHp;
        this.HpActuel = maxHp;
    }

    dégâts(ennemi:Personnage,multiplicate:number=1) {
        ennemi.viePerdue(this.attaque,multiplicate)
    }

    viePerdue(dégâtsSubis:number,multiplicate:number){
        if (this.attaque > this.defense+2){
            this.HpActuel= Math.max(this.HpActuel-(Math.round((dégâtsSubis - this.defense)*multiplicate)),0)
        } else {
            this.HpActuel= Math.max(this.HpActuel-2,0)
        }
    }

    abstract Tour(aventurier:Personnage[],monstre:Personnage[])

    abstract attaqueSpéciale(ennemi:Personnage):object

    soin(percent : number,typeHeal:string="soin") {
        if(typeHeal==="soin"){
            console.log("Tu ne peux pas soigner un mort")
        } else {
            if(this.HpActuel > this.HpActuel + this.maxHp*(percent/100)) {
                this.HpActuel = this.maxHp
            } else {
                this.HpActuel += this.maxHp*(percent/100)
            }
        }
    }

    réanimation(percent : number) {
        if(this.HpActuel <= 0) {
            this.soin(percent,"résurrection")
        } else {
            console.log("Tu ne peux pas réanimer un allié déjà vivant")
        }
    }
}