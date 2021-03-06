const service = require('../service/usuario.service');
const config = require('../appconfig');
const defaultConfig = require('../helper/defaultConfigurationsHelper');
const saveImageHelper = require('../helper/SaveImage');
const data = { usuario: null, config: null };

let usuarioController = {
    index: async (req, res) => {
        try {
            await defaultConfig.loadDefaultInformations(req,res);
            if(req.session.tipoConta != "admin"){
                res.render('pages/DeniedAccess');
            }        
            res.render('pages/usuario-lista', {
            data: await service.getUsuario(),
            msg: null
        });
        } catch (error) {
            console.log('Deu Zica: ' + error);
            res.render('pages/usuario-lista', {
                data: data,
                msg: error
            });
        }
    },

    cadastro: async (req, res) => {
        await defaultConfig.loadDefaultInformations(req,res);
        if(req.session.tipoConta != "admin"){
            res.render('pages/DeniedAccess');
        }
        res.render('pages/usuario-cadastro', {
            data: data,
            msg: null
        });  
    },

    /**
     * Pesquisa cliente com base no id informado e retorna
     * pagina de detalhes.
     */
    detalhe: async (req, res) => {
        await defaultConfig.loadDefaultInformations(req,res);
        if(req.session.tipoConta != "admin"){
            res.render('pages/DeniedAccess');
        }
        var id = req.params.id;
        var usuarioDetalhes = await service.getById(id);        
        res.render('pages/usuario-cadastro', {
            data: usuarioDetalhes,
            msg: null
        });        
    },

    deletar : async (req, res) => {        
        await defaultConfig.loadDefaultInformations(req,res);
        if(req.session.tipoConta != "admin"){
            res.render('pages/DeniedAccess');
        }
        var id = req.params.id;
        await service.delete(id); 
        res.render('pages/usuario-lista', {
            data: await service.getUsuario(),
            msg: null
        });
    },

    deletarPost : async (req, res) => {        
        await defaultConfig.loadDefaultInformations(req,res);
        if(req.session.tipoConta != "admin"){
            res.render('pages/DeniedAccess');
        }
        var id = req.body.id;
        await service.delete(id); 
        res.send("sucesso");
    },

    create: async (req, res) => {
        var mensagem =[];
        await defaultConfig.loadDefaultInformations(req,res);
        if(req.session.tipoConta != "admin"){
            res.render('pages/DeniedAccess');
        }
        let input = req.body;
         try {            
            data.config = await service.updateUsuario(input);    
            if(data && !input.id){                
                 saveImageHelper.createDefaultLogo(data.config._id);
            }
            
            if(data.config){
                if(data.config.errors){   
                    if(data.config.errors.email){
                        mensagem.push(data.config.errors.email.message)
                    }
                    if(data.config.errors.usuario){
                        mensagem.push(data.config.errors.usuario.message)
                    }
                    console.log(mensagem);
                    res.render('pages/usuario-cadastro', {
                        data: input,
                        msg: mensagem
                    });  
                    return;
                } else{
                    res.render('pages/usuario-lista', {
                        data: await service.getUsuario(),
                        msg: null
                    });
                }               
            }    
            else{
                res.render('pages/usuario-lista', {
                    data: await service.getUsuario(),
                    msg: null
                });
            }   
        } catch (error) {
            console.log('Deu Zica: ' + error);
             res.render('pages/usuario-lista', {
                data: data,
                msg: error
            });
        }
    },
}

module.exports = usuarioController;