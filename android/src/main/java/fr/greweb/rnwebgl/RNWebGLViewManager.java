package fr.greweb.rnwebgl;

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
}
