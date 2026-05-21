import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Header() {
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Servix</Text>
          <Text style={styles.subtitle}>Find local services</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#2563eb',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: {
    backgroundColor: '#2563eb',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#dbeafe',
    marginTop: 4,
  },
});
