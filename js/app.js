import insertHeaderAndFooter from './insertHeaderAndFooter.js'
import {fetchProfileList} from './fetchProfile.js'
import setCounterFill from './counterFill.js'
import fetchTemplate from './fetchTemplate.js'
import initStepper from './stepper.js'

const target = document.querySelector('#seccion-obras');

const urlPerfiles = 'perfil.html'
// console.log(obras)
// console.log("ARTIMAÑAS :D")
init();

async function init(event) {
	// insertHeaderAndFooter();
	await appendCardsObras();

	initStepper();

	scrollIfEnObras();

	setCounterFill();
}

async function appendCardsObras() {
	const cardTemplate = await fetchTemplate('./componentes/card-obra/card-obra.html')

	const profileList = await fetchProfileList();
	const listEl = document.getElementById('lista-perfiles')
	profileList.forEach((perfil, i) => {
		const divEl = document.createElement('div')
		divEl.innerHTML = cardTemplate;

		if(i % 2 > 0)
			divEl.classList.add('columna-desfasada')
		divEl.classList.add(
			perfil.categoria.replace(' ', '-').toLowerCase()
		)
		divEl.classList.add('col')

		divEl.querySelector('.nombre-estudiante').innerText = perfil.nombre
		divEl.querySelector('.carta-imagen').style.backgroundImage = `url(${perfil.foto_portada})`
		divEl.querySelector('.titulo-obra').innerText = perfil.titulo_obra
		divEl.querySelector('.categoria-obra').innerText = perfil.categoria.toLowerCase()

		divEl.querySelector('a').href = `perfil.html?p=${perfil.id}`

		listEl.append(divEl)
	});
}

function scrollIfEnObras() {
	const url = new URL(window.location)
	if(url.hash == '#seccion-obras') target.scrollIntoView();
}
