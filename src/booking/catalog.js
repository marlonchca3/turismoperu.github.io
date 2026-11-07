import { toursParis, toursBarcelona, toursNewYork } from '../server/data/tours';

const tours = [...toursParis, ...toursBarcelona, ...toursNewYork];
export const findTour = (id) => tours.find((tour) => String(tour.tourId) === String(id));
