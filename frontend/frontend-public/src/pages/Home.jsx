import React from 'react';
import { Button } from 'react-bootstrap';

const Home = ({ onSelect }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      color: '#fff',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
    },
    subtitle: {
      fontSize: '1.25rem',
      marginBottom: '3rem',
      color: '#cbd5e1',
      textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
    },
    cardsContainer: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '900px',
      width: '100%',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '2rem',
      flex: '1 1 280px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
    },
    icon: {
      fontSize: '3.5rem',
      marginBottom: '1rem',
      filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.7))',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '0.75rem',
    },
    cardText: {
      fontSize: '1rem',
      marginBottom: '1.5rem',
      color: '#d1d5db',
    },
    button: {
      width: '100%',
      fontWeight: '600',
      fontSize: '1rem',
    },
  };

  // Para efecto hover simple
  const [hovered, setHovered] = React.useState(null);

  const cards = [
    {
      title: 'Productos',
      text: 'Ve a products en el menu.',
      variant: 'info',
      path: '/products',
    },
    {
      title: 'Empleados',
      text: 'Ve al menu en employees.',
      variant: 'success',
      path: '/employees',
    },
    {
      title: 'Sucursales',
      text: 'Ve al menu en branches.',
      variant: 'warning',
      path: '/branches',
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a Zona Digital</h1>
      <p style={styles.subtitle}>
       Ve al menu
      </p>

      <div style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(hovered === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardText}>{card.text}</p>
            <Button
              variant={card.variant}
              style={styles.button}
              onClick={() => onSelect(card.path)}
            >
               {card.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
