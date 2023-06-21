import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Provider, PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar translucent={true} />
            <View style={styles.container}>
              <Text>Open up ScoreMate App!</Text>
            </View>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default App
