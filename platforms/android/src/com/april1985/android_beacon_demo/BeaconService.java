package com.april1985.android_beacon_demo;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

public class BeaconService extends CordovaPlugin {

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
        callbackContext.success("Hello");
		return true;
	}

	@Override
	public void onPause(boolean multitasking) {
		super.onPause(multitasking);
	}

	@Override
	public void onResume(boolean multitasking) {
		super.onResume(multitasking);
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
	}
}
