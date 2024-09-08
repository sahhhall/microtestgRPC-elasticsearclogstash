const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "./grpc/profile.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const profileProto = grpc.loadPackageDefinition(packageDefinition).profile;

const profileService = {
  CreateUserProfile: (call, callback) => {
    const { userId, email } = call.request;
    console.log(`Received request: userId=${userId}, email=${email}`);
      // If no errors,  `null` for the error and the res obj on 2
    callback(null, {
      userId,
      success: true,
    });
  },
};

const server = new grpc.Server();
server.addService(profileProto.ProfileService.service, profileService);

const port = "50051";
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Profile Service running on port 50052");
  }
);
