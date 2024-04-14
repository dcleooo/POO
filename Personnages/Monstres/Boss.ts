import Monstres from "./Monstre%201.ts";
import Character from "./Character.ts";

class Boss extends Monstres {
    constructor(name: string) {
        super(name, 15, 15, 5, 200);
    }

    performSpecialAction(targets: Character[]): void {
        console.log(`${this.name} utilise Attaque de groupe.`);
        targets.forEach(target => {
            const damage = Math.round((this.attack - target.defense) * 0.4);
            target.takeDamage(damage);
        });
    }

    // Implémentez d'autres méthodes spécifiques au boss si nécessaire
}

export default Boss;
