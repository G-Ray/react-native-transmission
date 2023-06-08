#ifndef TRANSMISSION_H
#define TRANSMISSION_H

#include <string>

using std::string;

namespace transmission {
  void init(string config_dir, string app_name);
  string request(string json_string);
  void close();
}

#endif /* TRANSMISSION_H */
