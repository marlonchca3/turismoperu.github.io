import { toursBarcelona, toursParis, toursNewYork } from './tours';

export const topDestinationParis = {
  destination: 'paris',
  img: `${process.env.PUBLIC_URL}/images/cusco.jpg`,
  description: "Descubre Cusco, una ciudad de calles de piedra, plazas llenas de historia y tradiciones andinas. Pasea por su centro histórico y encuentra inspiración para conocer Machu Picchu.",
  activities: toursParis.slice(0, 4),
  todo: toursParis.slice(4, 8),
  url: '/dicovery/paris',
  iconic: [
    {
      location: "Plaza de Armas de Cusco",
      count: 99,
      img: `${process.env.PUBLIC_URL}/images/cusco.jpg`,
    },
    {
      location: "Machu Picchu",
      count: 74,
      img: `${process.env.PUBLIC_URL}/images/machu-picchu.jpg`,
    },
    {
      location: "Centro histórico de Cusco",
      count: 11,
      img: `${process.env.PUBLIC_URL}/images/cusco.jpg`,
    },
  ],
};

export const topDestinationBarcelona = {
  destination: 'barcelona',
  img: `${process.env.PUBLIC_URL}/images/arequipa.jpg`,
  description: "Conoce Arequipa, la Ciudad Blanca del Perú. Descubre su arquitectura de sillar, pasea por la Plaza de Armas y disfruta de los sabores de su cocina tradicional.",
  activities: toursBarcelona.slice(0, 4),
  todo: toursBarcelona.slice(4, 8),
  url: '/dicovery/barcelona',
  iconic: [
    {
      location: "Catedral de Arequipa",
      count: 81,
      img: `${process.env.PUBLIC_URL}/images/arequipa.jpg`,
    },
    {
      location: "Plaza de Armas de Arequipa",
      count: 18,
      img: `${process.env.PUBLIC_URL}/images/arequipa.jpg`,
    },
    {
      location: "Centro histórico de Arequipa",
      count: 53,
      img: `${process.env.PUBLIC_URL}/images/arequipa.jpg`,
    },
  ],
};

export const topDestinationNewYork = {
  destination: 'new-york-city',
  img: `${process.env.PUBLIC_URL}/images/ica.jpg`,
  description: "Explora Ica y el oasis de Huacachina. Descubre una laguna rodeada de palmeras, paisajes de dunas y atardeceres en el desierto peruano.",
  activities: toursNewYork.slice(0, 4),
  todo: toursNewYork.slice(4, 8),
  url: '/dicovery/new-york-city',
  iconic: [
    {
      location: "Oasis de Huacachina",
      count: 454,
      img: `${process.env.PUBLIC_URL}/images/ica.jpg`,
    },
    {
      location: "Dunas de Ica",
      count: 61,
      img: `${process.env.PUBLIC_URL}/images/ica.jpg`,
    },
    {
      location: "Laguna de Huacachina",
      count: 93,
      img: `${process.env.PUBLIC_URL}/images/ica.jpg`,
    },
  ],
};
