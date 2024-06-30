#ifndef TRANSMISSION_H
#define TRANSMISSION_H

#include <string>
#include <future>

#include "../cpp/transmission/libtransmission/transmission.h"
#include "../cpp/transmission/libtransmission/rpcimpl.h"
#include "../cpp/transmission/libtransmission/utils.h"
#include "../cpp/transmission/libtransmission/variant.h"

using std::string;

namespace transmission {
  void init(string config_dir, string app_name);
  string request(string json_string);
  void close();
  void saveSettings();
}

#endif /* TRANSMISSION_H */
