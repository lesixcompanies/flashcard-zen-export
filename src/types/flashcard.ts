
export interface FlashcardData {
  id: string;
  term: string;
  definition: string;
}

export interface CustomizationSettings {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    cardBg: string;
    cardText: string;
  };
  typography: {
    fontFamily: string;
    termSize: string;
    definitionSize: string;
  };
  dimensions: {
    cardHeight: string;
    cardWidth: string;
    borderRadius: string;
  };
  features: {
    showProgress: boolean;
    showShuffle: boolean;
    showCounter: boolean;
    autoFlip: boolean;
  };
}
