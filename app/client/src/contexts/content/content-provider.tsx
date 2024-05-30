import { ReactNode, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllContent } from '../../services/content.services';
import { useSelector } from '../../store';
import { getProfile } from '../../util/auth.util';
import { ContentContext } from './content-context';
import { IReadContent } from '../../types/content.types';

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<IReadContent[]>([]);
  const [selectedContentIndex, setSelectedContentIndex] = useState(0);
  const [newCategories, setNewCategories] = useState<string[]>([]);

  const { authToken } = useSelector((state) => state.auth);
  const { fetchData: getContent, isLoading } = useHttp(getAllContent);

  useEffect(() => {
    if (authToken) {
      const user = getProfile(authToken);
      if (!user) return;

      const fetchContent = async () => {
        const content = await getContent({ companyId: user.companyId });

        if (content.data.length > 0) {
          setContent(content.data);
        }
      };

      fetchContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        selectedContentIndex,
        setSelectedContentIndex,
        isLoading,
        newCategories,
        setNewCategories,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
