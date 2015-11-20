var grpc = require('grpc');

var dispatcher_proto = grpc.load('dispatcher.proto').dispatcher;

var dispatcher = process.env['DISPATCHER'] || 'localhost';

var client = new dispatcher_proto.Dispatcher(dispatcher+':50051',
    grpc.Credentials.createInsecure());

client.dispatch({image:byteStream}, function(err, response) {
    if (err) {
        res.status(500).send(err);
        return;
    }
    res.render('index.hbs',
        {name:filename, image:response.image.toString('base64')})
});
