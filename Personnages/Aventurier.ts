import Personnage from "./Personnage.ts"

export default abstract class Aventurier extends Personnage{
    attaqueSpéciale(ennemi : Personnage):object {return {play:false,object:ennemi}}
}