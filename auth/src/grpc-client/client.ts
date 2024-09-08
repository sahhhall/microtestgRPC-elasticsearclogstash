import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { CreateUserProfileRequest } from '../../generated/profile/CreateUserProfileRequest';
import { CreateUserProfileResponse } from '../../generated/profile/CreateUserProfileResponse';

const PROTO_PATH = __dirname + '/proto/profile.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

const profileProto = grpc.loadPackageDefinition(packageDefinition).profile as any;

export const client = new profileProto.ProfileService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);


export const registerProfile = (userId: string, email: string): Promise<CreateUserProfileResponse> => {
    return new Promise((resolve, reject) => {
        client.CreateUserProfile({ userId, email }, (error: any, response: CreateUserProfileResponse) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};