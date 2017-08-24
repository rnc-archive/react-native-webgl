package fr.greweb.rnwebgl;

import android.graphics.Bitmap;
import android.support.annotation.Nullable;

import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.common.RotationOptions;
import com.facebook.imagepipeline.core.DefaultExecutorSupplier;
import com.facebook.imagepipeline.core.ExecutorSupplier;
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.memory.PoolConfig;
import com.facebook.imagepipeline.memory.PoolFactory;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.views.imagehelper.ImageSource;

public class RNWebGLTextureImageLoader extends ReactContextBaseJavaModule implements RNWebGLTextureConfigLoader {

    ExecutorSupplier executorSupplier;

    public RNWebGLTextureImageLoader(ReactApplicationContext reactContext) {
        super(reactContext);
        PoolFactory poolFactory = new PoolFactory(PoolConfig.newBuilder().build());
        int numCpuBoundThreads = poolFactory.getFlexByteArrayPoolMaxNumThreads();
        executorSupplier = new DefaultExecutorSupplier(numCpuBoundThreads);
    }

    @Override
    public String getName() {
        return "RNWebGLTextureImageLoader";
    }

    @Override
    public boolean canLoadConfig(ReadableMap config) {
        return config.hasKey("image");
    }

    @Override
    public void loadWithConfig(final ReadableMap config, final RNWebGLTextureCompletionBlock callback) {
        String source;
        try {
            source = config.getString("image");
        }
        catch (Exception ignoredException) {
            source = config.getMap("image").getString("uri");
        }

        ImageSource imageSource = new ImageSource(this.getReactApplicationContext(), source);

        ImageRequest imageRequest = ImageRequestBuilder
                .newBuilderWithSource(imageSource.getUri())
                .setRotationOptions(RotationOptions.disableRotation()) // FIXME is it still correct? check with diff EXIF images
                .build();

        DataSource<CloseableReference<CloseableImage>> pending =
                Fresco.getImagePipeline().fetchDecodedImage(imageRequest, null);

        pending.subscribe(new BaseBitmapDataSubscriber() {
            @Override
            protected void onNewResultImpl(@Nullable Bitmap bitmap) {
                callback.call(null, new RNWebGLTextureBitmap(config, bitmap));
            }
            @Override
            protected void onFailureImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
                callback.call(new Exception("Image Load Failure"), null);
            }
        }, executorSupplier.forDecode());
    }
}

