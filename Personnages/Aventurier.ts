import Personnage from "./Personnage.ts"
import { ObjectReturn } from "./objectReturn.ts";

export default abstract class Aventurier extends Personnage{
    attaqueSpéciale(ennemi : Personnage):ObjectReturn {return {play:false,object:ennemi}}
}