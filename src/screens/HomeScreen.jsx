import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Surface, Text, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation, route }) {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: "Terceiras Intenções 2024",
      subtitle: "Luna Live, Joinville",
      image: "assets/img/image.png",
      date: "21 de junho de 2024",
      description: "O Terceiras Intenções já tem data marcada e como todo ano a atração nacional é sensacional.",
      icon: "microphone",
      moreInfo: "O evento contará com várias atrações locais e um show especial de encerramento com Mc Livinho.",
    },
    {
      id: '2',
      title: "Dia D Pijama Terceirão Bonja",
      subtitle: "Colégio Bonja - Bom Jesus, Joinville",
      image: "assets/img/diad.png",
      date: "22 de agosto de 2024",
      description: "Os alunos do Bonja passam por mais um dia D, neste mês será o Dia D Pijama!",
      icon: "star",
      moreInfo: "Os alunos participarão de atividades recreativas e haverá um concurso de pijamas.",
    },
    {
      id: '3',
      title: "Colação Senac",
      subtitle: "Faculdade Senac, Joinville",
      image: "assets/img/gra.webp",
      date: "19 de dezembro de 2024",
      description: "A colação está chegando no Colégio! Prepare sua beca e venha celebrar esse grande momento.",
      icon: "party-popper",
      moreInfo: "Teremos a entrega de diplomas, discursos emocionantes, homenagens e muita celebração para marcar essa conquista especial.",
    },
  ]);

 
  useEffect(() => {
    if (route.params?.newEvent) {
      setEvents((prevEvents) => [...prevEvents, route.params.newEvent]);
    }
  }, [route.params?.newEvent]);

  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { event });
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={() => navigation.navigate("HomeScreen")}
          mode="text"
          style={styles.initialButton}
          labelStyle={styles.initialButtonText}
        >
          Inicial
        </Button>
        <Button
          onPress={() => navigation.navigate("PerfilScreen")}
          mode="contained"
          style={styles.profileButton}
        >
          <MaterialCommunityIcons name="account" size={24} color="#a547bf" />
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Eventos Imperdíveis</Text>
        </View>
        {events.map((event, index) => (
          <Card key={index} style={styles.eventCard} onPress={() => handleEventPress(event)}>
            <Card.Cover
              source={{ uri: event.image }}
              style={styles.cardImage}
            />
            <Card.Title
              title={event.title}
              subtitle={event.subtitle}
              left={(props) => (
                <IconButton
                  {...props}
                  icon={event.icon}
                  style={styles.cardIcon}
                />
              )}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
            <Card.Content>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={() => navigation.navigate("EventsScreen")}
          mode="contained"
          style={styles.button}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="#a547bf" />
        </Button>

        <Button
          onPress={() => navigation.navigate("HomeScreen")}
          mode="contained"
          style={styles.button}
        >
          <MaterialCommunityIcons name="home" size={24} color="#a547bf" />
        </Button>

        <Button
          onPress={() => navigation.navigate("BankScreen")}
          mode="contained"
          style={styles.button}
        >
          <MaterialCommunityIcons name="bank" size={24} color="#a547bf" />
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  initialButton: {
    backgroundColor: 'transparent',
  },
  initialButtonText: {
    fontSize: 18,
    color: '#a547bf',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 10,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 60, // Para evitar sobreposição com o header
  },
  subtitleContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a547bf',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    margin: 20,
  },
  eventCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 6,
    backgroundColor: '#ffffff',
  },
  cardImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
  },
  cardIcon: {
    alignSelf: 'center',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flex: 1,
    marginHorizontal: 5,
  },
});
