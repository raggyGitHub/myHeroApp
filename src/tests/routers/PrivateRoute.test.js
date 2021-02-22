import React from 'react';
import { mount } from "enzyme";
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute/>', () => {

	const props = {
		location: {
			pathname: '/marvel'
		}
	}
	Storage.prototype.setItem = jest.fn();

	test('debe de mostrar el componente si esta autenticado y guardar localstorage', () => {

		const wrapper = mount(
			<MemoryRouter>
				<PrivateRoute
					isAuthenticated={true}
					component={() => (<span>ready¡¡</span>)}
					{...props}
				/>
			</MemoryRouter>
		);
		//console.log(wrapper.html());
		expect(wrapper.find('span').exists()).toBe(true);
		expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');

	});

	test('debe de bloquear el componente si no está autenticado', () => {
		const wrapper = mount(
			<MemoryRouter>
				<PrivateRoute
					isAuthenticated={false}
					component={() => (<span>ready¡¡</span>)}
					{...props}
				/>
			</MemoryRouter>
		);
		//console.log(wrapper.html());
		expect(wrapper.find('span').exists()).toBe(false);
		expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
	});


});
