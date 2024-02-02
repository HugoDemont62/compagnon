import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { WebView } from 'react-native-webview';

const HomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const pdfLinks = {
    '2023-03-01': 'https://example.com/pdf1.pdf',
    '2023-03-02': 'https://example.com/pdf2.pdf',
    // Ajoutez plus de dates et de liens PDF ici
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          '2023-03-01': {marked: true, dotColor: 'red'},
          '2023-03-02': {marked: true, dotColor: 'blue'},
          // Add more dates to be marked here
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#ff0000',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      {selectedDate && pdfLinks[selectedDate] && (
        <WebView
          source={{ uri: pdfLinks[selectedDate] }}
          style={{ marginTop: 20 }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('Report');
      }}>
        <Text style={styles.text}>Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;