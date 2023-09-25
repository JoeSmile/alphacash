import { WebView } from "react-native-webview";

export default function LoanAgreement({ route }) {
  return (
    <WebView
      style={{ flex: 1, padding: 12 }}
      source={{ uri: route.params.uri || "https://www.google.com" }}
    ></WebView>
  );
}
