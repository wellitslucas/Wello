import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import NavigationBar from '../components/NavigationBar';

const avatarImage = require('../assets/images/Intersect.png');
const foodImages = [
  require('../assets/images/image26.png'),
  require('../assets/images/image27.png'),
  require('../assets/images/image28.png'),
];

// Function to load the custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'Manjari-Bold': require('../assets/fonts/Manjari-Bold.ttf'),
    'Manjari-Regular': require('../assets/fonts/Manjari-Regular.ttf'),
    'PublicSans-Bold': require('../assets/fonts/PublicSans-Bold.ttf'),
  });
};

export default function TPlateScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [carbExpanded, setCarbExpanded] = useState(false);

  // Load fonts when the component mounts
  useEffect(() => {
    const loadAndSetFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    
    loadAndSetFonts();
  }, []);

  // Display a loading state while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', fontSize: 20 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Image source={avatarImage} style={styles.avatar} />
            <Feather name="menu" size={30} color="#A87C5F" style={styles.menuIcon} />
          </View>
          <View style={styles.headerBottomRow}>
            <Ionicons name="arrow-back" size={45} color="#A87C5F" />
            <Text style={styles.headerTitle}>Today's Plate</Text>
          </View>
        </View>

        {/* Calorie Summary */}
        <View style={styles.calorieBox}>
          <View style={styles.calorieLeftAligned}>
            <Text style={styles.calorieNumber}>1030</Text>
            <Text style={styles.calorieLabel}>Calories</Text>
          </View>
          <View style={styles.calorieGoalBoxRight}>
            <Text style={styles.calorieGoalLabel}>Until goal:</Text>
            <Text style={styles.calorieGoalValue}>800</Text>
          </View>
          <View style={styles.calorieBarBackground}>
            <View style={[styles.calorieBarFill, { width: '56%' }]} />
          </View>
        </View>

        {/* Carbohydrates with Dropdown */}
        <View style={[styles.card, { backgroundColor: "#FDC48C" }]}>      
          <View style={styles.cardHeader}>
            <View style={styles.iconLabel}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="rice" size={24} color="white" />
              </View>
              <Text style={styles.cardText}>Carbohydrates</Text>
            </View>
            <TouchableOpacity onPress={() => setCarbExpanded(!carbExpanded)}>
              <Feather name={carbExpanded ? 'chevron-up' : 'chevron-down'} size={24} />
            </TouchableOpacity>
          </View>
          <View style={[styles.progressBar, { backgroundColor: "#f8b06a" }]}>        
            <View style={[styles.progressFill, { backgroundColor: "#E47A00", width: '60%' }]}>          
              <Text style={styles.cardNote}>115g to go</Text>
            </View>
          </View>

          {carbExpanded && (
            <View style={styles.foodListInCardWithBG}>
              {foodImages.map((imgSrc, index) => (
                <View key={index} style={styles.foodCard}>
                  <Image source={imgSrc} style={styles.foodImage} />
                  <Text style={styles.foodLabel}>
                    {[
                      "90 Second Brown Rice, Quinoa & Red Rice with Flaxseeds...",
                      "Quaker Express Maple Brown Sugar Oatmeal 1.69oz",
                      "Sliced Sourdough Bread - 17oz - Favorite Day™"
                    ][index]}
                  </Text>
                  <Feather name="chevron-right" size={20} color="#000" />
                </View>
              ))}
            </View>
          )}
        </View>

        {renderCategory("Protein", "12g to go", "#9CCEDF", "#5F99C9", 80, "#70B9D2", <MaterialCommunityIcons name="egg" size={24} color="white" />)}
        {renderCategory("Vegetables", "Great job!", "#B4CEB3", "#87A878", 100, "#aedfa3", <MaterialCommunityIcons name="carrot" size={24} color="white" />)}
        {renderCategory("Fruits", "1/4 cup to go", "#FAD4D8", "#E3889D", 80, "#F4B8C6", <MaterialCommunityIcons name="fruit-cherries" size={24} color="white" />)}
        {renderCategory("Fats", "28g to go", "#FFE6B7", "#D7B351", 40, "#E8D39B", <FontAwesome5 name="hamburger" size={24} color="white" />)}
        
        {/* Add extra padding at the bottom to ensure content isn't hidden behind the navbar */}
        <View style={styles.navbarSpacer} />
      </ScrollView>
      
      {/* Add the NavigationBar component */}
      <NavigationBar />
    </View>
  );
}

// Fixed the type for fillPercent to be a number
function renderCategory(
  label: string,
  note: string,
  cardColor: string,
  fillColor: string,
  fillPercent: number,
  bgColor: string,
  icon: React.ReactNode
) {
  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>      
      <View style={styles.cardHeader}>
        <View style={styles.iconLabel}>
          <View style={styles.iconCircle}>{icon}</View>
          <Text style={styles.cardText}>{label}</Text>
        </View>
        <Feather name="chevron-down" size={24} />
      </View>
      <View style={[styles.progressBar, { backgroundColor: bgColor }]}>        
        <View style={[styles.progressFill, { backgroundColor: fillColor, width: `${fillPercent}%` }]}>          
          <Text style={styles.cardNote}>{note}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faeee8' },
  container: { padding: 20, paddingBottom: 60 },
  header: { marginBottom: 20 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  menuIcon: { padding: 4 },
  headerBottomRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontFamily: 'Manjari-Bold', marginLeft: 12, marginTop: 12 },
  calorieBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  calorieLeftAligned: { alignItems: 'flex-start' },
  calorieNumber: { fontSize: 48, fontFamily: 'PublicSans-Bold', marginLeft: -6 },
  calorieLabel: { fontSize: 16, fontFamily: 'Manjari-Regular', marginTop: -4 },
  calorieGoalBoxRight: { position: 'absolute', right: 20, top: 20, alignItems: 'flex-end' },
  calorieGoalLabel: { fontFamily: 'PublicSans-Bold', fontSize: 16 },
  calorieGoalValue: { fontFamily: 'PublicSans-Bold', fontSize: 22 },
  calorieBarBackground: {
    height: 14,
    backgroundColor: '#e0d8ce',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  calorieBarFill: {
    height: '100%',
    backgroundColor: '#5b3d1f',
    borderRadius: 10,
  },
  card: {
    borderRadius: 25,
    padding: 20,
    marginTop: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardText: {
    fontFamily: 'Manjari-Bold',
    fontSize: 20,
  },
  progressBar: {
    height: 20,
    borderRadius: 20,
    marginTop: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressFill: {
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  cardNote: {
    fontSize: 15,
    fontFamily: 'Manjari-Regular',
    color: 'white',
  },
  foodListInCardWithBG: {
    marginTop: 14,
    gap: 14,
    padding: 12,
    backgroundColor: '#FDC48C',
    borderRadius: 20,
  },
  foodCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 10,
  },
  foodLabel: {
    flex: 1,
    fontFamily: 'Manjari-Regular',
    fontSize: 14,
  },
  // Add extra space at the bottom to prevent content from being hidden behind the navbar
  navbarSpacer: {
    height: 80,
  },
});