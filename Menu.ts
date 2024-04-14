export default class Menu {

    message: string;
    options: string[];

    constructor(message: string, options: string[]){
        this.message = message
        this.options = options
    }

    input() : number {
        //console.log(`
        //╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
        //║                                                                                                                                       ║
        //║                                                                                                                                       ║
        //║       Attaque : 8                     Attaque Spéciale:              Attaque : 5                      attaque spéciale:               ║
        //║       Defence : 3                     Attaque un monstre             Defence : 3                      Redonne 25% d'HP                ║
        //║       Vitesse : 6                    aléatoire pour 130%             Vitesse : 9                      a un character                  ║
        //║       Vie :  40      1. Barbare      des dégâts d'attaque            Vie :  30         4. Pretre      choisi                          ║
        //║                                                                                                                                       ║
        //║                                                                                                                                       ║
        //║       Attaque : 4                    Special Attaque:                Attaque : 6                      Attaque spéciale:               ║
        //║       Defence : 3                    Une attaque magique             Defence : 5                      A 60% de chance                 ║
        //║       Vitesse : 8                     qui ignore                     Vitesse : 10                     de voler un objet               ║
        //║       Vie :  20       2. Mage          la defense                    Vie :  35          5. Voleur     aléatoire                       ║
        //║                                                                                                                                       ║
        //║                                                                                                                                       ║
        //║       Attaque : 6                    Attaque spéciale:               Attaque : 7                     Attaque spéciale:                ║
        //║       Defence : 8                    Vise tout les ennemis           Defence : 7                     n'a pas d'attaque                ║
        //║       Vitesse : 4                    et leurs inflige 40%            Vitesse : 5                      spéciale                        ║
        //║       Vie : 40       3. Paladin      à tout le monde                     Vie : 50     6. Guerrier                                     ║
        //║                                                                                                                                       ║
        //║                                                                                                                                       ║
        //╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
        //║     Game :                                                                                                                            ║
        //║                                                                                                                                       ║
        //╠═════════════════════════════╦═════════════════════════════════════════════════════════════════════════════════════════════════════════╣
        //║                             ║                                                                                                         ║
        //║         1. Attaque          ║           2. Attaque Spéciale         ║           3. Inventaire           ║           4. Quitter        ║
        //║                             ║                                                                                                         ║
        //╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`)

        /**
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                                                       ║
║             4. Temp Name (MiniTroll)                5. Temp Name (Phantome)             2. Temp Name (Araignée Venimeuse)             ║
║             ████████████████████ 4/30             ████████████████████ 13/20          ████████████████████ 15/15                ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║                                                                                                                                       ║
║          6. Temp Name (Guerrier)             1. Temp Name (Mage)                3. Temp Name (Paladin)                                ║
║          ████████████████████ 24/50       ████████████████████ 2/20       ████████████████████ 36/40                           ║
║                                                                                                                                       ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

        console.log(this.message);
        console.log(this.options);

        const promptValue = prompt("Que veux-tu faire ?");
        const input = Number(promptValue);

        if(isNaN(input)) {
            console.log("Choix non valide");
            return this.input();
        } else if (Number.isInteger(input) && input > 0) {
            if(input <= this.options.length) {
                return input-1
            } else {
                console.log("Choix non valide");
                return this.input();                
            } 
        } else {
            console.log("Choix non valide");
            return this.input();              
        }
    }

    printFight() {

    }

    printChestRoom() {

        //console.log(`
        //╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                ⠀⠀⠀                                                                                                      ║
        //║                                ⠀⠀                                                                                                       ║
        //║                                ⠀⠀⠀⠀                                                                                                    ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                          ║
        //║                                ⠀                                                                                                        ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                        ⠀⠀                                                                              ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //║                                                                                                                                         ║
        //╠═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
        //║     Game :                                                                                                                              ║
        //╠═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
        //║         1. Attaquer         ║           2. Attaque Spéciale         ║           3. Inventaire           ║           4. Quitter          ║
        //╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`)

    }

    printInventory() {

    }

    printMessage() {
        
    }
}
