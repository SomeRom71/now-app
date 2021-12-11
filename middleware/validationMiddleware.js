module.exports = function(schema){
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync({ ...req.body });
            next();
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}