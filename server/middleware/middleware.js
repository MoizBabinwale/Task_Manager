const logger = async (req, res, next) => {
    await console.log('Middleware ran')
    console.log(req.method);
    next()
}
module.exports=logger
