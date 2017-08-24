package fr.greweb.rnwebgl;

import com.facebook.react.bridge.ReadableMap;

public interface RNWebGLTextureConfigLoader {
    boolean canLoadConfig (ReadableMap config);
    void loadWithConfig (ReadableMap config, RNWebGLTextureCompletionBlock callback);

}
