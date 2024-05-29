import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const StockForecastWebView = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://stock-forecast-app-mycfphngss9hczwvzqdmsx.streamlit.app/' }} 
        style={{ flex: 1 }} 
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StockForecastWebView;
