import React from 'react';
import {View, ScrollView, Text, SafeAreaView, FlatList} from 'react-native';
import {WebView} from 'react-native-webview';
const customHTML = `
<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
        <h1 style="text-align: center;">Invoice</h1>
        <hr>
        
        <div style="display: flex; justify-content: space-between;">
            <div>
                <h3>From:</h3>
                <p>Your Company Name</p>
                <p>Your Address</p>
                <p>City, State, ZIP</p>
            </div>
            
            <div>
                <h3>To:</h3>
                <p>Client Name</p>
                <p>Client Address</p>
                <p>City, State, ZIP</p>
            </div>
        </div>
        
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ccc;">Description</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ccc;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc;">Item 1</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ccc;">$100.00</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc;">Item 2</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ccc;">$50.00</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
                    <td style="padding: 10px; text-align: right;">$150.00</td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>>`;

const TestPDF = () => {
  const renderItem = () => {
    return (
      <View style={{width: '47%', height: 290, margin: 5}}>
        <WebView
          source={{html: customHTML}}
          scalesPageToFit={false}
          scrollEnabled={false}
          javaScriptEnabled={true}
          allowsFullscreenVideo={true}
          style={{flex:1}}
          // style={{width: 180, height: 290, margin: 5}}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView nestedScrollEnabled>
        <FlatList
          data={[0, 0, 0, 0]}
          numColumns={2}
          nestedScrollEnabled
          renderItem={renderItem}
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestPDF;
