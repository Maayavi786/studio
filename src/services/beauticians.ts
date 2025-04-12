/**
 * Represents a beautician profile.
 */
export interface Beautician {
  /**
   * The unique identifier for the beautician.
   */
  id: string;
  /**
   * The name of the beautician.
   */
  name: string;
  /**
   * A brief description of the beautician's expertise.
   */
  expertise: string;
  /**
   * An array of services offered by the beautician.
   */
  services: string[];
}

/**
 * Asynchronously retrieves a list of renowned regional beauticians (face-free images).
 * Returns a maximum of 5 beauticians.
 *
 * @returns A promise that resolves to an array of Beautician objects.
 */
export async function getBeauticians(): Promise<Beautician[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      name: 'Aisha Al-Saud',
      expertise: 'Bridal Makeup and Hair Styling',
      services: ['Bridal Makeup', 'Hair Styling', 'Henna Designs'],
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      expertise: 'Advanced Skin Care and Facials',
      services: ['Facials', 'Skin Analysis', 'Chemical Peels'],
    },
    {
      id: '3',
      name: 'Noura Al-Salem',
      expertise: 'Nail Art and Manicure/Pedicure',
      services: ['Manicures', 'Pedicures', 'Nail Art'],
    },
    {
      id: '4',
      name: 'Layla Al-Ghamdi',
      expertise: 'Hair Coloring and Treatments',
      services: ['Hair Coloring', 'Hair Treatments', 'Hair Extensions'],
    },
    {
      id: '5',
      name: 'Hessa Al-Otaibi',
      expertise: 'Eyelash and Eyebrow Design',
      services: ['Eyelash Extensions', 'Eyebrow Shaping', 'Eyelash Tinting'],
    },
  ];
}
