import { useContext } from 'react';
import { ContentContext } from '../contexts/content/content-context';

export const useContentContext = () => useContext(ContentContext);
