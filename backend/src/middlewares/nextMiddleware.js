export default function PreReq(app, io, connectedDevs) {
  app.use((req, res, next) => {
    req.io = io;
    req.connectedDevs = connectedDevs;

    return next();
  });
}
