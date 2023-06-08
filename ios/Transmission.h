#ifdef __cplusplus
#import "react-native-transmission.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTransmissionSpec.h"

@interface Transmission : NSObject <NativeTransmissionSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Transmission : NSObject <RCTBridgeModule>
#endif

@end
