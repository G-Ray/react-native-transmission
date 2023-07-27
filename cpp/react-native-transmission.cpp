#include "react-native-transmission.h"

#include "../cpp/transmission/libtransmission/transmission.h"
#include "../cpp/transmission/libtransmission/rpcimpl.h"
#include "../cpp/transmission/libtransmission/utils.h"
#include "../cpp/transmission/libtransmission/variant.h"
#include <future>

using std::string;

#define MEM_K 1024
#define MEM_K_STR "KiB"
#define MEM_M_STR "MiB"
#define MEM_G_STR "GiB"
#define MEM_T_STR "TiB"

#define DISK_K 1000
#define DISK_K_STR "kB"
#define DISK_M_STR "MB"
#define DISK_G_STR "GB"
#define DISK_T_STR "TB"

#define SPEED_K 1000
#define SPEED_K_STR "kB/s"
#define SPEED_M_STR "MB/s"
#define SPEED_G_STR "GB/s"
#define SPEED_T_STR "TB/s"

namespace transmission {
	typedef struct {
		tr_variant request;
		std::promise<std::string> promise;
	} callback_struct;

	tr_session* session;
	std::string configDir;

	void init(string config_dir, string app_name) {
		tr_variant settings;
		configDir = config_dir;

		tr_formatter_mem_init(MEM_K, MEM_K_STR, MEM_M_STR, MEM_G_STR, MEM_T_STR);
		tr_formatter_size_init(DISK_K, DISK_K_STR, DISK_M_STR, DISK_G_STR, DISK_T_STR);
		tr_formatter_speed_init(SPEED_K, SPEED_K_STR, SPEED_M_STR, SPEED_G_STR, SPEED_T_STR);

		tr_variantInitDict(&settings, 0);
  		tr_sessionLoadSettings(&settings, configDir.c_str(), app_name.c_str());

  		session = tr_sessionInit(configDir.c_str(), true, &settings);

		tr_ctor* ctor = tr_ctorNew(session);
		tr_sessionLoadTorrents(session, ctor);
		tr_ctorFree(ctor);

		tr_variantClear(&settings);
	}

	void rpc_response_func(tr_session* session, tr_variant* response, void* callback_user_data) {
		std::string json = tr_variantToStr(response, TR_VARIANT_FMT_JSON);
		callback_struct* cs = (callback_struct*) callback_user_data;
		
		cs->promise.set_value(json);

		tr_variantClear(response);
	}

	void execute_request(callback_struct& cs) {
		tr_rpc_request_exec_json(session, &cs.request, rpc_response_func, &cs);
	}

	string request(string json_string) {
		callback_struct callback_user_data;
		tr_variantFromBuf(&callback_user_data.request, TR_VARIANT_PARSE_JSON, json_string);
		auto future = callback_user_data.promise.get_future();

		std::thread thread(execute_request, std::ref(callback_user_data));
		
		std::string value = future.get();
		thread.join();
		return value;
	}

	void close() {
		saveSettings();
		tr_sessionClose(session);
	}

	void saveSettings() {
		tr_variant settings;

		tr_variantInitDict(&settings, 0);
		tr_sessionSaveSettings(session, configDir.c_str(), &settings);
		tr_variantClear(&settings);
	}
}
