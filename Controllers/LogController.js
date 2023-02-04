/** atividades relacionadas à gestão do sistema */
const system_testing = {
    debug: "teste"
}

/** atividades relacionadas ao acesso do sistema */
const system_acess = {
    login_try: 'tentativa de login',
    login_sucess: 'login bem sucedido',
    logout: 'logout' 
}

/** atividades relacionadas a operações sobre usuários */
const user_profile = {
    register: 'registro de usuário',
    deletion: 'deleção de usuário',
    update: 'alteração nos dados do usuário',
}

/**
 * armazena as diferentes atividades que o servidor executa
 */
const activity_types = {system_acess, user_profile, system_testing};

/**
 * registra uma atividade no painel de logs.
 * @param {string} con conexão com banco de dados sql.
 * @param {string} date data do evento.
 * @param {string} type tipo de atividade.
 * @param {string} description descrição detalhada.
 */
function register_log(con, date, type, description){
    var sql_query = "INSERT INTO Log(date, type, description) VALUES ?";
    var values = [[date, type, description]];

    con.query(sql_query, [values], (error, result, fields) => {
        if(error){
            return console.log(error);
        } else {
            console.log('operação registrada com sucesso nos logs');
            console.log(result);
            con.end();
        }
    });
}

module.exports = {register_log, activity_types};