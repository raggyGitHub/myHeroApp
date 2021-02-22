import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroById';

export const HeroScreen = ({ history }) => {

	const { heroeId } = useParams();

	const hero = useMemo(() => getHeroesById(heroeId), [heroeId])
	//console.log('Hero: ', hero, 'HeroID:', heroeId);

	if (!hero) {
		return <Redirect to="/" />;
	}
	//const hero = getHeroesById(heroId);
	const handleReturn = () => {
		if (history.length <= 2) {
			history.push('/');
		} else {
			history.goBack();
		}
	}

	const {
		superhero,
		publisher,
		alter_ego,
		first_appearance,
		characters
	} = hero;


	return (
		<div className="row mt-5">
			<div className="col-4">
				<img
					className="img-thumbnail animate__animated animate__fadeInLeft"
					alt={superhero}
					src={`https://github.com/raggyGitHub/myHeroApp/blob/main/public/assets/heroes/assets/heroes/${heroeId}.jpg`}
				/>
			</div>
			<div className="col-8">
				<h3>{superhero}</h3>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<b>Alter ego: </b>{alter_ego}
					</li>
					<li className="list-group-item">
						<b>Publisher: </b>{publisher}
					</li>
					<li className="list-group-item">
						<b>Alter ego: </b>{first_appearance}
					</li>
				</ul>

				<h5>Characters</h5>
				<p>{characters}</p>
				<button
					className="btn btn-warning"
					onClick={handleReturn}
					type="">Return</button>

			</div>

		</div>
	)
}
