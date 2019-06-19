const Essencia = require("../model/essencia");
const status = require("http-status");

exports.buscarUm = (request, response, next) => {
    const id = request.params.id;

    Essencia.findByPk(id)
        .then(essencia => {
            if (essencia) {
                response.status(status.OK).send(essencia);
            } else {
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
//middleware
exports.buscarTodos = (request, response, next) => {
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);

    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.BAD_REQUEST).send();
    }

    const ITENS_POR_PAGINA = 10;

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Essencia.findAll({ limit: limite, offset: pagina })
        .then(essencias => {
            response.send(essencias);
        })
        .catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const avaliacao = request.body.avaliacao;
    const nome = request.body.nome;
    const marca = request.body.marca;
    const sabor = request.body.sabor;

    Essencia.create({
        avaliacao: avaliacao,
        nome: nome,
        marca: marca,
        sabor: sabor
    })
        .then(() => {
            response.status(status.CREATED).send();
        })
        .catch(error => next(error));
};

exports.atualizar = (request, response, next) => {
    const id = request.params.id;

    const avaliacao = request.body.avaliacao;
    const nome = request.body.nome;
    const marca = request.body.marca;
    const sabor = request.body.sabor;

    Essencia.findByPk(id)
        .then(essencia => {
            if (essencia) {
                Essencia.update(
                    {
                        avaliacao: avaliacao,
                        nome: nome,
                        marca: marca,
                        sabor: sabor
                    },
                    { where: { id: id } }
                )
                    .then(() => {
                        response.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.excluir = (request, response, next) => {
    const id = request.params.id;

    Essencia.findByPk(id)
        .then(essencia => {
            if (essencia) {
                Essencia.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        response.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

















