const Validator = require('validator');
const colors = require('colors');

exports.validarArea = (req, res, next) => {

    const { remove, update } = req.body;


    const error = {};

    console.log(colors.rainbow('-----Validar update-----'));
    console.log(update);
    console.log(colors.rainbow('----Fin validar update------'));



    for (let key in update) {

        if (Validator.isEmpty(update[key]._id)
            || Validator.isEmpty(update[key].codigo)
            || Validator.isEmpty(update[key].nombre)
            || !typeof update[key].requiere_comanda === 'boolean'
            || Validator.isEmpty(update[key].estado)
            || isNaN(Validator.toInt(update[key].ts + ''))) {
            error._id = update[key]._id;
        }

        if (!error.id) {
            //Sanitizar
            update[key]._id = Validator.escape(update[key]._id.trim());
            update[key].codigo = Validator.escape(update[key].codigo.trim()).toUpperCase();
            update[key].nombre = Validator.escape(update[key].nombre.trim()).toUpperCase();
            update[key].estado = Validator.escape(update[key].estado.trim());
        }

    }

    if (error._id) {
        return res.status(400).send({
            error
        });
    }

    console.log(colors.red('--------validar remove---------'));
    console.log(remove);
    console.log(colors.red('---------Fin validar remove--------'));

    for (let key in remove) {
        if (Validator.isEmpty(remove[key])) {
            error._id = remove[key];
        } else {
            //Sanitizar
            remove[key] = remove[key].trim();
        }


    }

    req.body.update = update;
    req.body.remove = remove;

    console.log(colors.yellow('-----Despues de sanitizar--------------'));
    console.log(req.body);
    console.log(colors.yellow('------Fin sanitizar-----------'));

    next();
}

