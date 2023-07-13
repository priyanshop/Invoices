import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import {Alert, StyleSheet, View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

import htmlContent from './injectedHtml';
import injectedSignaturePad from './injectedJavaScript/signaturePad';
import injectedApplication from './injectedJavaScript/application';
import injectedErrorHandler from './injectedJavaScript/errorHandler';
import injectedExecuteNativeFunction from './injectedJavaScript/executeNativeFunction';

const SignaturePad = forwardRef(
  ({onChange, onError, style, penColor, dataURL}: any, ref) => {
    const [hide, setFide] = useState<boolean>(true);
    const mWebView = useRef<any>(null);
    // const { backgroundColor } = StyleSheet.flatten(style);
    const injectedJavaScript =
      injectedExecuteNativeFunction +
      injectedErrorHandler +
      injectedSignaturePad +
      injectedApplication(penColor, '#fff', dataURL);
    const html = htmlContent(injectedJavaScript);
    const [value, setValue] = useState();

    const source = {html: html + value};

    // useEffect(() => {
    //   const { backgroundColor } = StyleSheet.flatten(style);
    //   const injectedJavaScript =
    //     injectedExecuteNativeFunction +
    //     injectedErrorHandler +
    //     injectedSignaturePad +
    //     injectedApplication(penColor, backgroundColor, dataURL);
    //   const html = htmlContent(injectedJavaScript);
    //   const source = { html };
    //   setSource(source);
    // }, [penColor, style, dataURL]);

    const _onNavigationChange = (args: any) => {
      _parseMessageFromWebViewNavigationChange(unescape(args.url));
    };

    const _parseMessageFromWebViewNavigationChange = (newUrl: any) => {
      const hashUrlIndex = newUrl.lastIndexOf('#');
      if (hashUrlIndex === -1) {
        return;
      }

      let hashUrl = newUrl.substring(hashUrlIndex);
      hashUrl = decodeURIComponent(hashUrl);
      const regexFindAllSubmittedParameters = /&(.*?)&/g;

      const parameters: any = {};
      let parameterMatch = regexFindAllSubmittedParameters.exec(hashUrl);
      if (!parameterMatch) {
        return;
      }

      while (parameterMatch) {
        const parameterPair = parameterMatch[1];

        const parameterPairSplit = parameterPair.split('<-');
        if (parameterPairSplit.length === 2) {
          parameters[parameterPairSplit[0]] = parameterPairSplit[1];
        }

        parameterMatch = regexFindAllSubmittedParameters.exec(hashUrl);
      }

      if (!_attemptToExecuteNativeFunctionFromWebViewMessage(parameters)) {
        var data = JSON.parse(parameters.arguments);
        // console.log("hashUrl", data.base64DataUrl);
        onChange(data.base64DataUrl);
        // console.log(
        //   { parameters, hashUrl },
        //   "Received an unknown set of parameters from WebView"
        // );
      }
    };

    const _attemptToExecuteNativeFunctionFromWebViewMessage = (
      message: any,
    ) => {
      if (message.executeFunction && message.arguments) {
        const parsedArguments = JSON.parse(message.arguments);

        const referencedFunction =
          newFunction()['_bridged_' + message.executeFunction];
        if (typeof referencedFunction === 'function') {
          referencedFunction(parsedArguments);
          return true;
        }
      }

      return false;

      function newFunction(this: any) {
        return this;
      }
    };

    const _renderError = (args: any) => {
      onError({details: args});
    };

    useImperativeHandle(ref, () => ({
      cleare,
      Clear,
    }));

    const cleare = () => {
      //   // mWebView?.current?.reload();
      //   // mWebView.current.injectJavaScript("SignaturePad.clear();");
      //   mWebView.current.injectJavaScript(`
      //   document.SignaturePad.clear()
      // `);
    };

    const Clear = () => {
      // mWebView.current.injectJavaScript('SignaturePad.clear();');
      // setTimeout(() => {
      mWebView.current.reload();
      setFide(true);
      setValue(Math.random);
      // }, 500);

      //   mWebView.current.injectJavaScript(`
      //   document.SignaturePad.clear()
      // `);
    };

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <WebView
          ref={mWebView}
          automaticallyAdjustContentInsets={false}
          onNavigationStateChange={_onNavigationChange}
          onError={_renderError}
          // renderLoading={_renderLoading}
          // renderLoading={}
          source={source}
          javaScriptEnabled={true}
          style={style}
          onTouchStart={() => {
            setFide(false);
          }}
        />
        {hide && (
          <Text
            style={{
              position: 'absolute',
              alignSelf: 'center',
              color: '#003087',
            }}>
            Sign Here
          </Text>
        )}
      </View>
    );
  },
);

export default SignaturePad;
