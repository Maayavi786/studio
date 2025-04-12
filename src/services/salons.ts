/**
 * Represents a salon with its details.
 */
export interface Salon {
  /**
   * The unique identifier for the salon.
   */
  id: string;
  /**
   * The name of the salon.
   */
  name: string;
  /**
   * A description of the salon.
   */
  description: string;
  /**
   * URL of an image showcasing the salon's interior.
   */
  interiorImageUrl: string;
  /**
   * An array of services offered by the salon.
   */
  services: string[];
  /**
   * The pricing information for the salon's services.
   */
  pricing: string;
  /**
   * Whether the salon is ladies-only.
   */
  ladiesOnly: boolean;
}

/**
 * Asynchronously retrieves a curated list of salons from Al-Ahsa.
 * Returns a maximum of 5 salons.
 *
 * @returns A promise that resolves to an array of Salon objects.
 */
export async function getSalons(): Promise<Salon[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      name: 'Luxury Salon',
      description: 'A premium salon experience in Al-Ahsa.',
      interiorImageUrl: 'url_to_image_1',
      services: ['Haircut', 'Facial', 'Manicure'],
      pricing: 'High',
      ladiesOnly: true,
    },
    {
      id: '2',
      name: 'Modern Salon',
      description: 'Contemporary styles and services.',
      interiorImageUrl: 'url_to_image_2',
      services: ['Hair Coloring', 'Pedicure', 'Waxing'],
      pricing: 'Medium',
      ladiesOnly: true,
    },
    {
      id: '3',
      name: 'Classic Salon',
      description: 'Traditional beauty treatments.',
      interiorImageUrl: 'url_to_image_3',
      services: ['Henna', 'Threading', 'Makeup'],
      pricing: 'Low',
      ladiesOnly: false,
    },
    {
      id: '4',
      name: 'Elegant Salon',
      description: 'Sophisticated services for special occasions.',
      interiorImageUrl: 'url_to_image_4',
      services: ['Bridal Makeup', 'Hair Styling', 'Nail Art'],
      pricing: 'High',
      ladiesOnly: true,
    },
    {
      id: '5',
      name: 'Royal Salon',
      description: 'A regal experience with top-tier beauticians.',
      interiorImageUrl: 'url_to_image_5',
      services: ['Hair Extensions', 'Eyelash Extensions', 'Skin Care'],
      pricing: 'High',
      ladiesOnly: true,
    },
  ];
}
