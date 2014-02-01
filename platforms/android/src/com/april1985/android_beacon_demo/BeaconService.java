package com.april1985.android_beacon_demo;

import android.os.RemoteException;
import android.util.Log;
import com.radiusnetworks.ibeacon.IBeacon;
import com.radiusnetworks.ibeacon.RangeNotifier;
import com.radiusnetworks.ibeacon.Region;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.Collection;

import static com.april1985.android_beacon_demo.BeaconDemo.getBeaconManager;

public class BeaconService extends CordovaPlugin implements RangeNotifier {

    public static final Region REGION = new Region("REGION", null, null, null);
    public static final String TAG = "BeaconService";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        getBeaconManager().setRangeNotifier(this);
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {
        if (action.equals("start")) {
            return startScan(callbackContext);
        }

        if (action.equals("stop")) {
            return stopScan(callbackContext);
        }

        return true;
    }

    private boolean stopScan(CallbackContext callbackContext) {
        try {
            getBeaconManager().stopRangingBeaconsInRegion(REGION);
            callbackContext.success("Beacon monitor stopped");
            return true;
        } catch (RemoteException e) {
            e.printStackTrace();
            callbackContext.error("Beacon monitor stop failed");
            return false;
        }
    }

    private boolean startScan(CallbackContext callbackContext) {
        try {
            getBeaconManager().startRangingBeaconsInRegion(REGION);
            callbackContext.success("Beacon Manager start successful");
            return true;
        } catch (RemoteException e) {
            callbackContext.error("Beacon Manager start failed");
            return false;
        }
    }

    @Override
    public void didRangeBeaconsInRegion(Collection<IBeacon> iBeacons, Region region) {
        for (IBeacon iBeacon : iBeacons) {
            Log.d(TAG, iBeacon.getProximityUuid());
        }
    }
}
