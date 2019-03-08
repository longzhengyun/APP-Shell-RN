//
//  AppInfoModule.m
//  NMLoanPlatform
//
//  Created by 肖锐 on 2019/1/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AppInfoModule.h"

@interface AppInfoModule ()
@end

@implementation AppInfoModule

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getAppChannel, resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString *channelPath = [[NSBundle mainBundle] pathForResource:@"channel" ofType:@"txt"];
  if (channelPath != nil) {	
    NSError *error = nil;
    NSString *channel = [NSString stringWithContentsOfFile:channelPath encoding:NSUTF8StringEncoding error:&error];
    if (error != nil) {
      reject(@"0", @"no channel find", error);
    }else{
      resolve(channel);
    }
  }else{
    reject(@"0", @"no channel find", nil);
  }
}

@end
