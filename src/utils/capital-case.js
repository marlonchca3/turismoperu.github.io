// Display names only: keep the existing destination IDs and routes unchanged.
const DESTINATION_NAMES = {
  amsterdam: 'Lima',
  barcelona: 'Arequipa',
  berlin: 'Puno',
  dubai: 'Iquitos',
  london: 'Trujillo',
  'new-york-city': 'Ica',
  'new-york': 'Ica',
  paris: 'Cusco',
  rome: 'Huaraz',
};

export const capitalCase = (text) => DESTINATION_NAMES[text]
  || text.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
