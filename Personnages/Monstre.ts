import Personnage from "./Personnage.ts";


export default abstract class Monstre extends Personnage{
    dégâtsSubis(){}
    attaqueSpéciale(ennemi : Personnage):object {return {play:false,object:ennemi}}
    aventurierAvecLeMoinsDeHp(personnages:Personnage[]):Personnage{
        let aventurier : Personnage =personnages[0]
        let lowerHP : number = personnages[0].HpActuel
        personnages.pourTous(personnages => {
            if ((personnages.HpActuel/personnages.maxHp)*100<(lowerHP/personnages.maxHp)*100){
                aventurier=personnages
                lowerHP=personnages.HpActuel
            }
        });
        return aventurier
    }
}