module.exports = {
    port: process.env.PORT || 7001,
    /* Local */
    //db: process.env.MONGODB || 'mongodb://localhost:',
    /* Production */
    db:'mongodb+srv://christhoper:honduras100@cluster0-bh6yp.mongodb.net/gatitos?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miclavedetokenxd'
}