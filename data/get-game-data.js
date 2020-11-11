import remark from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

import Data from '../mock/data.json';

const getGameData = async (id) => {
  const game = Data.games.find((g) => g.id === id);
  if (!game) return { id, title: '', contentHtml: '' };

  /** rules */
  // Use gray-matter to parse the post metadata section
  const matterResultRules = matter(game.rules);

  // Use remark to convert markdown into HTML string
  const processedContentRules = await remark()
    .use(html)
    .process(matterResultRules.content);
  const rulesContent = processedContentRules.toString();

  /** notes */
  // Use gray-matter to parse the post metadata section
  const matterResultNotes = matter(game.notes);

  // Use remark to convert markdown into HTML string
  const processedContentNotes = await remark()
    .use(html)
    .process(matterResultNotes.content);
  const notesContent = processedContentNotes.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    rulesContent,
    notesContent,
    title: game.title,
    image: game.image,
    ...matterResultRules.data,
    ...matterResultNotes.data,
  };
};

export default getGameData;
