// Original file: src/grpc-client/proto/profile.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateUserProfileRequest as _profile_CreateUserProfileRequest, CreateUserProfileRequest__Output as _profile_CreateUserProfileRequest__Output } from '../profile/CreateUserProfileRequest';
import type { CreateUserProfileResponse as _profile_CreateUserProfileResponse, CreateUserProfileResponse__Output as _profile_CreateUserProfileResponse__Output } from '../profile/CreateUserProfileResponse';

export interface ProfileServiceClient extends grpc.Client {
  CreateUserProfile(argument: _profile_CreateUserProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  CreateUserProfile(argument: _profile_CreateUserProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  CreateUserProfile(argument: _profile_CreateUserProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  CreateUserProfile(argument: _profile_CreateUserProfileRequest, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  createUserProfile(argument: _profile_CreateUserProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  createUserProfile(argument: _profile_CreateUserProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  createUserProfile(argument: _profile_CreateUserProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  createUserProfile(argument: _profile_CreateUserProfileRequest, callback: grpc.requestCallback<_profile_CreateUserProfileResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ProfileServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUserProfile: grpc.handleUnaryCall<_profile_CreateUserProfileRequest__Output, _profile_CreateUserProfileResponse>;
  
}

export interface ProfileServiceDefinition extends grpc.ServiceDefinition {
  CreateUserProfile: MethodDefinition<_profile_CreateUserProfileRequest, _profile_CreateUserProfileResponse, _profile_CreateUserProfileRequest__Output, _profile_CreateUserProfileResponse__Output>
}
