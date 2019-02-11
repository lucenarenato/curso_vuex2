import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {Time} from './time';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
    view: 'tabela',
    times: [
	/*new Time(1, 'Sao Paulo', require('./assets/sao_paulo_60x60.png')),
	new Time(2, 'Flamengo', require('./assets/flamengo_60x60.png')),
	new Time(3, 'Santos', require('./assets/santos_60x60.png')),
	new Time(4, 'Botafogo', require('./assets/botafogo_60x60.png')),
	new Time(5, 'Atlético-PR', require('./assets/atletico-pr_60x60.png')),
	new Time(6, 'Corinthians', require('./assets/corinthians_60x60.png')),
	new Time(7, 'Grêmio', require('./assets/gremio_60x60.png')),
	new Time(8, 'Fluminense', require('./assets/fluminense_60x60.png')),
	new Time(9, 'Botafogo', require('./assets/botafogo_60x60.png')),
	new Time(10, 'Chapecoense', require('./assets/chapecoense_60x60.png')),
	new Time(11, 'Cruzeiro', require('./assets/cruzeiro_60x60.png')),
	new Time(12, 'Sport', require('./assets/sport_60x60.png')),
	new Time(13, 'Ceará', require('./assets/ceara_60x60.png')),
	new Time(14, 'Paraná', require('./assets/parana_60x60.png')),
	new Time(15, 'Vasco', require('./assets/vasco_60x60.png')),
	new Time(16, 'Internacional', require('./assets/internacional_60x60.png')),
	new Time(17, 'Vitoria', require('./assets/vitoria_60x60.png')),
	//new Time(18, 'Sao Paulo', require('./assets/sao_paulo_60x60.png')),
	new Time(19, 'Santa Cruz', require('./assets/santa_cruz_60x60.png')),
	new Time(20, 'America-MG', require('./assets/america_mg_60x60.png')),*/
]
};

const mutations = {
    'set-times'(state, times){
        state.times = times;
    },
    update(state, time){
        let index = state.times.findIndex(element => time.id == element.id);
        if (index != -1) {
            state.times[index] = time;
        }
    },
    'show-time-list'(state){
        state.view = 'tabela';
    },
    'show-time-novojogo'(state){
        state.view = 'novojogo';
    },
    'show-time-zona'(state){
        state.view = 'zona';
    }
};

const actions = {
    'load-times'(context){
        Vue.http.get('http://localhost:8080/dist/times.json').then(response => {
            let times = response.data.map(element => new Time(element.id, element.nome, element.escudo));
            context.commit('set-times', times);
        });
    }
};

export default new Vuex.Store({
    state,
    getters: {
        timesLibertadores: state => state.times.slice(0, 6),
        timesRebaixados: state => state.times.slice(16, 20),
    },
    mutations,
    actions
});
