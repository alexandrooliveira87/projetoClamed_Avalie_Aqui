import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch, Picker, Alert } from 'react-native';

const ReviewFormScreen = ({ route }: any) => {
  const { productId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [experience, setExperience] = useState('Feliz');
  const [recommend, setRecommend] = useState(true);

  const handleSubmit = async () => {
    // Validação dos campos
    if (!name || !email || !feedback) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const evaluation = {
      id: Date.now(), // Pode usar uma abordagem diferente para ID, dependendo da sua necessidade
      productId,
      name,
      email,
      feedback,
      experience,
      recommend,
    };

    try {
      const response = await fetch('http://localhost:3000/evaluations', { // Ajuste a URL conforme necessário
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluation),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
        // Limpar campos após envio
        setName('');
        setEmail('');
        setFeedback('');
        setExperience('Feliz');
        setRecommend(true);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar o feedback.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar o feedback.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliar Produto</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Seu feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      <Text style={styles.label}>Experiência:</Text>
      <Picker
        selectedValue={experience}
        style={styles.picker}
        onValueChange={(itemValue) => setExperience(itemValue)}
      >
        <Picker.Item label="Feliz" value="Feliz" />
        <Picker.Item label="Neutro" value="Neutro" />
        <Picker.Item label="Triste" value="Triste" />
      </Picker>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Recomendaria este produto?</Text>
        <Switch
          value={recommend}
          onValueChange={setRecommend}
        />
      </View>

      <Button title="Enviar Feedback" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4D58D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#2E8B57',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    borderColor: '#2E8B57',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ReviewFormScreen;
