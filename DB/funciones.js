const axios = require('axios');

/**
 * Creates a new user in the database.
 *
 * @param {string} username - The username of the user.
 * @param {string} nombre - The name of the user.
 * @param {string} password - The password of the user.
 * @param {string} summonerName - The summoner name of the user.
 * @param {Date} fechaNacimiento - The birthdate of the user.
 * @return {Promise<void>} A promise that resolves when the user is successfully created.
 */
async function crearUsuario(username, nombre, password, summonerName, fechaNacimiento) {
    const usuarioRepository = getRepository(Usuario);
  
    const nuevoUsuario = new Usuario();
    nuevoUsuario.username = username;
    nuevoUsuario.nombre = nombre;
    nuevoUsuario.password = password;
    nuevoUsuario.summoner_name = summonerName;
    nuevoUsuario.fecha_nacimiento = fechaNacimiento;
  
    await usuarioRepository.save(nuevoUsuario);
  
    console.log('Usuario creado exitosamente');
  }
//-----------------------------------------------------------------------------------------------------
/**
 * Asynchronously searches for a user by their ID in the database.
 *
 * @param {number} idUsuario - The ID of the user to search for.
 * @return {Promise<void>} - A promise that resolves when the user is found or not found.
 */
async function buscarUsuarioPorId(idUsuario) {
    const usuarioRepository = getRepository(Usuario);
    const usuarioEncontrado = await usuarioRepository.findOne(idUsuario);
  
    if (usuarioEncontrado) {
      console.log('Usuario encontrado:', usuarioEncontrado);
    } else {
      console.log('Usuario no encontrado');
    }
  }
// ----------------------------------------------------------------------------------------------------
/**
 * Asynchronously adds a role to a user in the database.
 *
 * @param {number} idUsuario - The ID of the user to add the role to.
 * @param {number} idRol - The ID of the role to add to the user.
 * @return {Promise<void>} - A promise that resolves when the role is added successfully or rejects with an error.
 */
  async function agregarRolAUsuario(idUsuario, idRol) {
    const usuarioRepository = getRepository(Usuario);
    const rolRepository = getRepository(Rol);
  
    const usuario = await usuarioRepository.findOne(idUsuario);
    const rol = await rolRepository.findOne(idRol);
  
    if (usuario && rol) {
      usuario.roles.push(rol);
      await usuarioRepository.save(usuario);
      console.log('Rol agregado al usuario exitosamente');
    } else {
      console.log('Usuario o rol no encontrado');
    }
  }
//-----------------------------------------------------------------------------------------------------
/**
 * Asynchronously busca un usuario por su nombre de usuario en la base de datos.
 *
 * @param {string} username - El nombre de usuario del usuario a buscar.
 * @return {Promise<void>} - Una promesa que se resuelve cuando se encuentra o no se encuentra el usuario.
 */
async function buscarUsuarioPorUsername(username) {
    const usuarioRepository = getRepository(Usuario);
    const usuarioEncontrado = await usuarioRepository.findOne({ where: { username } });
  
    if (usuarioEncontrado) {
      console.log('Usuario encontrado:', usuarioEncontrado);
    } else {
      console.log('Usuario no encontrado');
    }
}
//------------------------------------------------------------------------------------------------------
/**
 * Actualiza la información de un usuario en la base de datos.
 *
 * @param {number} idUsuario - El ID del usuario a actualizar.
 * @param {object} newData - Un objeto que contiene los datos actualizados del usuario.
 * @return {Promise<void>} - Una promesa que se resuelve cuando el usuario se actualiza con éxito o se rechaza con un error.
 */
async function actualizarUsuario(idUsuario, newData) {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne(idUsuario);

    if (usuario) {
        Object.assign(usuario, newData); // Actualiza los campos del usuario con los nuevos datos
        await usuarioRepository.save(usuario);
        console.log('Usuario actualizado exitosamente');
    } else {
        console.log('Usuario no encontrado');
    }
}
//--------------------------------------------------------------------------------------------------------
/**
 * Busca las cuentas favoritas de un usuario en la base de datos.
 *
 * @param {number} idUsuario - El ID del usuario cuyas cuentas favoritas se desean buscar.
 * @return {Promise<void>} - Una promesa que se resuelve con las cuentas favoritas del usuario o un mensaje si el usuario no tiene cuentas favoritas.
 */
async function buscarCuentasFavoritasDeUsuario(idUsuario) {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne(idUsuario, { relations: ['cuentasFavoritas'] });

    if (usuario && usuario.cuentasFavoritas.length > 0) {
        console.log('Cuentas favoritas del usuario:', usuario.cuentasFavoritas);
    } else {
        console.log('El usuario no tiene cuentas favoritas');
    }
}
//----------------------------------------------------------------------------------------------------------
/**
 * Busca los items favoritos de un usuario en la base de datos.
 *
 * @param {number} idUsuario - El ID del usuario cuyos items favoritos se desean buscar.
 * @return {Promise<void>} - Una promesa que se resuelve con los items favoritos del usuario o un mensaje si el usuario no tiene items favoritos.
 */
async function buscarItemsFavoritosDeUsuario(idUsuario) {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne(idUsuario, { relations: ['itemsFavoritos'] });

    if (usuario && usuario.itemsFavoritos.length > 0) {
        console.log('Items favoritos del usuario:', usuario.itemsFavoritos);
    } else {
        console.log('El usuario no tiene items favoritos');
    }
}
//---------------------------------------------------------------------------------------------------------
/**
 * Busca los campeones favoritos de un usuario en la base de datos.
 *
 * @param {number} idUsuario - El ID del usuario cuyos campeones favoritos se desean buscar.
 * @return {Promise<void>} - Una promesa que se resuelve con los campeones favoritos del usuario o un mensaje si el usuario no tiene campeones favoritos.
 */
async function buscarCampeonesFavoritosDeUsuario(idUsuario) {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne(idUsuario, { relations: ['campeonesFavoritos'] });

    if (usuario && usuario.campeonesFavoritos.length > 0) {
        console.log('Campeones favoritos del usuario:', usuario.campeonesFavoritos);
    } else {
        console.log('El usuario no tiene campeones favoritos');
    }
}
//-------------------------------------------------------------------------------------------------------------
/**
 * Obtiene los 5 jugadores con mayor rango en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con los jugadores o se rechaza con un error.
 */
async function obtenerJugadoresConMayorRango(region, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        // Obtiene los 5 jugadores con mayor rango
        const jugadores = response.data.entries.slice(0, 5);

        console.log('Los 5 jugadores con mayor rango son:');
        jugadores.forEach((jugador, index) => {
            console.log(`${index + 1}. ${jugador.summonerName} - ${jugador.tier} ${jugador.rank}`);
        });
    } catch (error) {
        console.error('Error al obtener los jugadores con mayor rango:', error.response.data);
    }
}

// Llama a la función para obtener los 5 jugadores con mayor rango en una región específica
//obtenerJugadoresConMayorRango('euw1', 'TU_API_KEY');  Reemplaza 'TU_API_KEY' con tu propia API Key de Riot Games
//-----------------------------------------------------------------------------------------------------------------
/**
 * Obtiene los detalles de un jugador por su nombre de invocador en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} summonerName - El nombre de invocador del jugador.
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con los detalles del jugador o se rechaza con un error.
 */
async function obtenerDetallesDeJugador(region, summonerName, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Detalles del jugador:', response.data);
    } catch (error) {
        console.error('Error al obtener los detalles del jugador:', error.response.data);
    }
}
//----------------------------------------------------------------------------------------------------------------
/**
 * Obtiene las partidas recientes de un jugador por su ID en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} summonerId - El ID de invocador del jugador.
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con las partidas recientes del jugador o se rechaza con un error.
 */
async function obtenerPartidasRecientes(region, summonerId, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${encodeURIComponent(summonerId)}/recent`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Partidas recientes del jugador:', response.data.matches);
    } catch (error) {
        console.error('Error al obtener las partidas recientes del jugador:', error.response.data);
    }
}
//------------------------------------------------------------------------------------------------------------------
/**
 * Obtiene los detalles de una partida por su ID en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} gameId - El ID de la partida.
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con los detalles de la partida o se rechaza con un error.
 */
async function obtenerDetallesDePartida(region, gameId, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/match/v4/matches/${gameId}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Detalles de la partida:', response.data);
    } catch (error) {
        console.error('Error al obtener los detalles de la partida:', error.response.data);
    }
}
//-------------------------------------------------------------------------------------------------------------------
/**
 * Obtiene las maestrías de campeones de un jugador por su ID en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} summonerId - El ID de invocador del jugador.
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con las maestrías de campeones del jugador o se rechaza con un error.
 */
async function obtenerMaestriasDeCampeones(region, summonerId, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Maestrías de campeones del jugador:', response.data);
    } catch (error) {
        console.error('Error al obtener las maestrías de campeones del jugador:', error.response.data);
    }
}
//-----------------------------------------------------------------------------------------------------------------------
/**
 * Obtiene los detalles de un campeón por su ID en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {number} championId - El ID del campeón.
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con los detalles del campeón o se rechaza con un error.
 */
async function obtenerDetallesDeCampeon(region, championId, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/static-data/v4/champions/${championId}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Detalles del campeón:', response.data);
    } catch (error) {
        console.error('Error al obtener los detalles del campeón:', error.response.data);
    }
}
//-----------------------------------------------------------------------------------------------------------------------
/**
 * Obtiene la lista de campeones disponibles en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con la lista de campeones o se rechaza con un error.
 */
async function obtenerListaDeCampeones(region, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/static-data/v4/champions`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Lista de campeones:', response.data);
    } catch (error) {
        console.error('Error al obtener la lista de campeones:', error.response.data);
    }
}
//------------------------------------------------------------------------------------------------------------------------
/**
 * Obtiene la lista de ítems disponibles en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con la lista de ítems o se rechaza con un error.
 */
async function obtenerListaDeItems(region, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/static-data/v4/items`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Lista de ítems:', response.data);
    } catch (error) {
        console.error('Error al obtener la lista de ítems:', error.response.data);
    }
}
//-----------------------------------------------------------------------------------------------------------------------------
/**
 * Obtiene los detalles de un ítem por su ID en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {number} itemId - El ID del ítem.
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con los detalles del ítem o se rechaza con un error.
 */
async function obtenerDetallesDeItem(region, itemId, apiKey) {
    const endpoint = `https://${region}.api.riotgames.com/lol/static-data/v4/items/${itemId}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-Riot-Token': apiKey
            }
        });

        console.log('Detalles del ítem:', response.data);
    } catch (error) {
        console.error('Error al obtener los detalles del ítem:', error.response.data);
    }
}
//-------------------------------------------------------------------------------------------------------------
/**
 * Obtiene detalles de la cuenta de un jugador por su nombre de invocador en una región específica.
 * @param {string} region - La región del servidor (por ejemplo, 'euw1' para Europa Oeste).
 * @param {string} summonerName - El nombre de invocador del jugador.
 * @param {string} apiKey - La API Key de Riot Games.
 * @returns {Promise<void>} - Una promesa que se resuelve con los detalles de la cuenta del jugador o se rechaza con un error.
 */
async function obtenerDetallesDeCuenta(region, summonerName, apiKey) {
    try {
        // Obtener detalles básicos del invocador
        const invocador = await obtenerDetallesDeJugador(region, summonerName, apiKey);
        console.log('Detalles básicos del invocador:', invocador);

        // Obtener historial de partidas
        const partidasRecientes = await obtenerPartidasRecientes(region, invocador.id, apiKey);
        console.log('Historial de partidas recientes:', partidasRecientes);

        // Obtener maestrías de campeones
        const maestriasCampeones = await obtenerMaestriasDeCampeones(region, invocador.id, apiKey);
        console.log('Maestrías de campeones:', maestriasCampeones);

        // Aquí también podrías agregar la función para obtener detalles de la liga clasificatoria si lo deseas

    } catch (error) {
        console.error('Error al obtener detalles de la cuenta:', error);
    }
}
