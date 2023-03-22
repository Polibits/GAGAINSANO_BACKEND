const express = require('express');
const router = express.Router();

module.exports = class AdmController {
    static async cleanDatabase(req, res) {
        try {
            res.send({
                'response':'error',
                'details':error
            });
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
            });
        }
    }
    static async deleteDatabase(req, res) {
        try {
            res.send({
                'response':'error',
                'details':error
            });
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
            });
        }
    }
}