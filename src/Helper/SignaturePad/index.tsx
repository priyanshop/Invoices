import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import htmlContent from "./injectedHtml";
import injectedSignaturePad from "./injectedJavaScript/signaturePad";
import injectedApplication from "./injectedJavaScript/application";
import injectedErrorHandler from "./injectedJavaScript/errorHandler";
import injectedExecuteNativeFunction from "./injectedJavaScript/executeNativeFunction";

const SignaturePad = forwardRef(
  ({ onChange, onError, style, penColor, dataURL ,image }: any, ref) => {
    const [hide, setFide] = useState<boolean>(true);
    const [cleareImage, setCleareImage] = useState<boolean>(true);
    const mWebView = useRef<any>(null);
    const { backgroundColor } = StyleSheet.flatten(style);
    const injectedJavaScript =
      injectedExecuteNativeFunction +
      injectedErrorHandler +
      injectedSignaturePad +
      injectedApplication(penColor, backgroundColor, dataURL);
    const html = htmlContent(injectedJavaScript);

    const source = { html: html };

    const _onNavigationChange = (args: any) => {
      _parseMessageFromWebViewNavigationChange(unescape(args.url));
    };

    const _parseMessageFromWebViewNavigationChange = (newUrl: any) => {
      const hashUrlIndex = newUrl.lastIndexOf("#");
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
        const parameterPairSplit = parameterPair.split("<-");
        if (parameterPairSplit.length === 2) {
          parameters[parameterPairSplit[0]] = parameterPairSplit[1];
        }
        parameterMatch = regexFindAllSubmittedParameters.exec(hashUrl);
      }

      if (!_attemptToExecuteNativeFunctionFromWebViewMessage(parameters)) {
        var data = JSON.parse(parameters.arguments);
        onChange(data.base64DataUrl);
      }
    };

    const _attemptToExecuteNativeFunctionFromWebViewMessage = (
      message: any
    ) => {
      if (message.executeFunction && message.arguments) {
        const parsedArguments = JSON.parse(message.arguments);

        const referencedFunction =
          newFunction()["_bridged_" + message.executeFunction];
        if (typeof referencedFunction === "function") {
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
      onError({ details: args });
    };

    useImperativeHandle(ref, () => ({
      cleare,
    }));

    const cleare = () => {
      setCleareImage(false);
      setTimeout(() => {
        setFide(true);
        setCleareImage(true);
      }, 100);
    };

    return (
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFF" }}
      >
        {cleareImage && (
          <WebView
            ref={mWebView}
            automaticallyAdjustContentInsets={false}
            onNavigationStateChange={_onNavigationChange}
            onError={_renderError}
            source={source}
            javaScriptEnabled={true}
            style={style}
            onTouchStart={() => {
              setFide(false);
            }}
            containerStyle={{
              flex:1,
              backgroundColor: '#fff',
            }}
          />
        )}

        {hide && (
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              color: "#003087",
            }}
          >
            Sign Here
          </Text>
        )}

        {/* {hide && image && (
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              flex: 1,
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            onTouchStart={() => {
              setFide(false);
            }}
          >
            <Image
              style={{
                flex: 1,
              }}
              source={image}
            />
          </View>
        )} */}
      </View>
    );
  }
);

export default SignaturePad;
