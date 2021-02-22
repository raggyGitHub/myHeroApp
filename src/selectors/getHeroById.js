import { heroes } from "../components/data/heroes";

export const getHeroesById = (id) => {

	return heroes.find(hero => hero.id === id);
}