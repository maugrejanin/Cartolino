// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TabsPage';

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = 'TabsPage';

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = 'HomePage';
export const Tab2Root = 'LigasPage';
export const Tab3Root = 'JogosPage';
export const Tab4Root = 'JogadoresPage';
export const status_mercado_aberto = 1;
export const status_mercado_fechado = 2;
export const status_mercado_em_manutencao = 4;
const HOST = 'https://api.cartolafc.globo.com/';
export const get_team_info_api = HOST + "auth/time"; // nao funciona com mercado = 4
export const get_ligas_info_api = HOST + "auth/ligas"; // nao funciona com mercado = 4
export const get_liga_info_api = HOST + "auth/liga/"; // nao funciona com mercado = 4
export const get_pontuados_api = HOST + "atletas/pontuados";  // funciona com mercado = 4
export const get_atletas_api = HOST + "atletas/mercado";  // funciona com mercado = 4
export const get_time_api = HOST + "time/id/"; // nao funciona com mercado = 4
export const get_mercado_info_api = HOST + "mercado/status";
export const get_promixas_partidas_api = HOST + "partidas";