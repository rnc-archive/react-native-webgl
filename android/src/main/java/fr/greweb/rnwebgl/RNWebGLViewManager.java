package fr.greweb.rnwebgl;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

import javax.annotation.Nullable;

public class RNWebGLViewManager extends SimpleViewManager<RNWebGLView> {
  public static final String REACT_CLASS = "RNWebGLView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public RNWebGLView createViewInstance(ThemedReactContext context) {
    return new RNWebGLView(context);
  }

  @Override
  public @Nullable Map getExportedCustomDirectEventTypeConstants() {
    return MapBuilder.of(
            "surfaceCreate",
            MapBuilder.of("registrationName", "onSurfaceCreate"));
  }

  @ReactMethod
  public void create(int ctxId, int x, int y, int w, int h, ReadableMap options, Promise promise) {
    Log.d("RNWebGL", ctxId+" "+x+","+y+" "+w+"x"+h);
  }
  }
