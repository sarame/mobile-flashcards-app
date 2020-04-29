import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

const DECKS_STORAGE_KEY = 'Flashcards:decks';

export function getData() {
  return decks;
}

export async function getDecks() {
  const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (storeResults === null) {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  }
  return storeResults === null ? decks : JSON.parse(storeResults);
}

export async function addNewDeck(title) {
  await AsyncStorage.mergeItem( DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export async function removeDeckAPI(key) {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const decks = JSON.parse(results);
    decks[key] = undefined;
    delete decks[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

export async function addQuestionAPI(title, question) {
  const deck = await getDeck(title);
  await AsyncStorage.mergeItem( DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        questions: [...deck.questions].concat(question)
      }
    })
  );
}