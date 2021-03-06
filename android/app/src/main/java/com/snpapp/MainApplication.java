package com.snpapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.calendarevents.CalendarEventsPackage;
import com.reactlibrary.CreateThumbnailPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import org.wonday.pdf.RCTPdfView;
import com.airbnb.android.react.maps.MapsPackage;
import org.reactnative.camera.RNCameraPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.snpapp.generated.BasePackageList;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
    new BasePackageList().getPackageList(),
    Arrays.<SingletonModule>asList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SvgPackage(),
            new RNDateTimePickerPackage(),
            new DatePickerPackage(),
            new CalendarEventsPackage(),
            new CreateThumbnailPackage(),
            new ReactNativeYouTube(),
            new SafeAreaContextPackage(),
            new RCTPdfView(),
            new MapsPackage(),
            new RNCameraPackage(),
            new RNCMaskedViewPackage(),
            new RNFetchBlobPackage(),
          new ReanimatedPackage(),
          new RNGestureHandlerPackage(),
          new RNScreensPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
