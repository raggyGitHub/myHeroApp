import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

	const location = useLocation();
	//console.log(location.search);
	//console.log(queryString.parse(location.search));

	const { q = '' } = queryString.parse(location.search);//cuando es undefined el valor q se asigna un valor vacio inicial
	const [formValues, handleInputChange, reset] = useForm({
		searchText: q,
	});//mi useForm hook

	const { searchText } = formValues;

	const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
	//const heroesFiltered = getHeroesByName(searchText);

	const handleSearch = (e) => {
		e.preventDefault();
		//console.log(searchText);
		history.push(`?q=${searchText}`);

	}

	return (
		<div>
			<h1>SearchScreen</h1>
			<hr />
			<div className="row">
				<div className="col-5">
					<h4>Search Form</h4>
					<hr />
					<form onSubmit={handleSearch}>
						<input
							autoComplete="off"
							className="form-control"
							name="searchText"
							onChange={handleInputChange}
							placeholder="Find your hero"
							type="text"
							value={searchText}
						/>
						<button
							className="btn m-1 btn-block btn-outline-primary"
							type="submit">
							Search...
						</button>

					</form>
				</div>
				<div className="col-7">
					<h4>Results</h4>
					<hr />
					{/* para la busqueda de heroes cuando no hay resultados */}
					{
						(q === '') && <div className="alert alert-info">
							Search a hero
							</div>
					}
					{
						(q !== '' && heroesFiltered.length === 0) && <div className="alert alert-danger">
							hero does not exist with {q}
						</div>
					}

					{
						heroesFiltered.map(hero => (
							<HeroCard
								key={hero.id}
								{...hero}
							/>
						))
					}
				</div>
			</div>
		</div>
	)
}
