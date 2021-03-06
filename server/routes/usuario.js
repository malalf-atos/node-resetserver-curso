const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado googlem img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios
                });
            })


        })

});

app.post('/usuario', [verificaToken, verificaAdminRol], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioBD.password = null;

        res.json({
            ok: true,
            usuario: usuarioBD
        });


    });

});


app.put('/usuario/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        })

    });


});

app.delete('/usuario/:id', [verificaToken, verificaAdminRol], (req, res) => {


    let id = req.params.id;

    let cambia = {
        estado: false
    };


    // Usuario.findByIdAndRemove(id, (err, usuarioB) => {
    Usuario.findByIdAndUpdate(id, cambia, { new: true, runValidators: true }, (err, usuarioB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioB
        })

    });

});

module.exports = app;