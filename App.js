import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity, 
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

const GridItem = ({ iconColor, title, subtitle, imageSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconPlaceholderContainer, { backgroundColor: iconColor + '1A' }]}>
        <Image source={imageSource} style={styles.realIcon} resizeMode="contain" />
      </View>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? '#1A1A1A' : '#F9F9FB' };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.helloText}>Hello 👋</Text>
            <Text style={styles.nameText}>Christie Doe</Text>
          </View>
          <View style={styles.avatarBorder}>
            <Image source={require('./assets/Mask Group.png')} style={styles.avatar} />
          </View>
        </View>

        <Text style={styles.insightsText}>Your Insights</Text>

        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <GridItem 
              iconColor="#A396FF" title="Scan new" subtitle="Scanned 483" 
              imageSource={require('./assets/Group 151.png')} 
              onPress={() => navigation.navigate('ScanScreen')} 
            />
            <GridItem 
              iconColor="#FF834E" title="Counterfeits" subtitle="Counterfeited 32" 
              imageSource={require('./assets/Frame.png')} 
            />
          </View>
          <View style={styles.gridRow}>
            <GridItem 
              iconColor="#34D399" title="Success" subtitle="Checkouts 8" 
              imageSource={require('./assets/Group 158.png')} 
            />
            <GridItem 
              iconColor="#60A5FA" title="Directory" subtitle="History 26" 
              imageSource={require('./assets/Group 157.png')} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const ScanScreen = ({ navigation }) => {
  return (
    <View style={styles.scanContainer}>
      <Image 
        source={require('./assets/Juice.jpg')} 
        style={styles.bottleBackground}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.backButtonSafeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.scannerFrame}>
         <View style={[styles.corner, styles.topLeft]} />
         <View style={[styles.corner, styles.topRight]} />
         <View style={[styles.corner, styles.bottomLeft]} />
         <View style={[styles.corner, styles.bottomRight]} />
      </View>

      <View style={styles.bottomCardContainer}>
        <View style={styles.bottomCard}>
          <View style={styles.cardInfo}>
            <Image 
              source={require('./assets/Juice.jpg')} 
              style={styles.cardImage} 
            />
            <View>
              <Text style={styles.cardBrand}>Lauren's</Text>
              <Text style={styles.cardTitle}>Orange Juice</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ScanScreen" component={ScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  helloText: { fontSize: 24, color: '#333333', fontWeight: 'normal' },
  nameText: { fontSize: 28, color: '#333333', fontWeight: 'bold' },
  avatarBorder: { padding: 2, borderRadius: 50, borderWidth: 1, borderColor: '#E6E8EB' },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  insightsText: { fontSize: 20, color: '#6F7782', marginBottom: 20, fontWeight: '500' },
  gridContainer: { flexDirection: 'column' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  itemContainer: {
    backgroundColor: '#FFFFFF', width: itemWidth, borderRadius: 24, padding: 20, alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5,
  },
  iconPlaceholderContainer: { width: 60, height: 60, borderRadius: 16, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  realIcon: { width: 28, height: 28 }, 
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 6, textAlign: 'center' },
  itemSubtitle: { fontSize: 14, color: '#A0A7B1', textAlign: 'center' },

  scanContainer: { flex: 1, backgroundColor: '#F8E9D2' }, 
  bottleBackground: { width: '100%', height: '100%', position: 'absolute' },
  backButtonSafeArea: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
  backButton: { width: 44, height: 44, backgroundColor: 'white', borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  backButtonText: { fontSize: 24, color: '#60A5FA', fontWeight: 'bold', marginBottom: 2 },
  
  scannerFrame: { position: 'absolute', top: height * 0.25, alignSelf: 'center', width: width * 0.7, height: height * 0.4 },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: 'white' },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 16 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 16 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 16 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 16 },

  bottomCardContainer: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
  bottomCard: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  cardInfo: { flexDirection: 'row', alignItems: 'center' },
  cardImage: { width: 50, height: 70, borderRadius: 8, marginRight: 15, backgroundColor: '#F0F0F0' },
  cardBrand: { fontSize: 14, color: '#A0A7B1', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
  addButton: { width: 40, height: 40, backgroundColor: '#60A5FA', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  addIcon: { fontSize: 24, color: 'white', fontWeight: 'bold', marginTop: -2 },
});

export default App;