const repo = require('../repository/configuracao.repository');

module.exports = {

    get: async () => {
        let config = await repo.get();
        if (!config) {
            config = {
                taxaInvestidor: '0.0',
                taxaEmprestimo: '0.0'
            };
            config = await repo.create(config);
        }
        return config;
    },

    getByUserId: async (userId) => {
        let config = await repo.getByUserId(userId);
        return config;
    },

    updateJuros: async (input) => {
        if (!input.taxaInvestidor) throw "TaxaInvestidor é obrigatório";
        if (!input.taxaEmprestimo) throw "TaxaEmprestimo é obrigatório";

        if (!input.id) {
            return await repo.create(input);
        } else {
            return await repo.update(input);
        }
    },

    UploadLogo: async(req, input) => {
        if (!input.id) {
            return await repo.createLogo(req, input);
        } else {
            return await repo.updateLogo(req, input);
        }
    },

}