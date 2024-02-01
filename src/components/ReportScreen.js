import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ReportScreen = ({navigation}) => {
  const [report, setReport] = useState({
    horaire: '',
    chantier: '',
    jourNuit: '',
    date: '',
    meteo: '',
    temperature: '',
    semaine: '',
    travaux: '',
    unite: '',
    quantite: '',
  });

  const handleInputChange = (name, value) => {
    setReport({...report, [name]: value});
  };

  const handleSubmit = () => {

    console.log(report);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
                 value={report.horaire}
                 onChangeText={(text) => handleInputChange('horaire', text)}
                 placeholder="Horaire"
      />
      <TextInput style={styles.textInput}
                 value={report.chantier}
                 onChangeText={(text) => handleInputChange('chantier', text)}
                 placeholder="Chantier"
      />
      <TextInput style={styles.textInput}
                 value={report.jourNuit}
                 onChangeText={(text) => handleInputChange('jourNuit', text)}
                 placeholder="Jour ou Nuit"
      />
      <TextInput style={styles.textInput}
                 value={report.date}
                 onChangeText={(text) => handleInputChange('date', text)}
                 placeholder="Date"
      />
      <TextInput style={styles.textInput}
                 value={report.meteo}
                 onChangeText={(text) => handleInputChange('meteo', text)}
                 placeholder="Météo"
      />
      <TextInput style={styles.textInput}
                 value={report.temperature}
                 onChangeText={(text) => handleInputChange('temperature', text)}
                 placeholder="Température"
      />
      <TextInput style={styles.textInput}
                 value={report.semaine}
                 onChangeText={(text) => handleInputChange('semaine', text)}
                 placeholder="Semaine"
      />
      <View>
        <TextInput style={styles.textInput}
                   value={report.travaux}
                   onChangeText={(text) => handleInputChange('travaux', text)}
                   placeholder="Travaux"
        />
        <TextInput style={styles.textInput}
                   value={report.unite}
                   onChangeText={(text) => handleInputChange('unite', text)}
                   placeholder="Unité"
        />
        <TextInput style={styles.textInput}
                   value={report.quantite}
                   onChangeText={(text) => handleInputChange('quantite', text)}
                   placeholder="Quantité"
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonSubmit}>
        <Text style={styles.textSubmit}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  buttonSubmit: {
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 10,
    marginBottom: 36,
  },
  textSubmit: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ReportScreen;