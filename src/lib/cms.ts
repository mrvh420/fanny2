import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Projekt {
  title: string;
  image: string;
  left_texts: { text: string }[];
  right_texts: { text: string }[];
  year: string;
  order: number;
  slug: string;
}

export interface Bild {
  title: string;
  description?: string;
  image: string;
}

export async function getProjekte(): Promise<Projekt[]> {
  const projekteDir = path.join(process.cwd(), 'content/projekte');
  
  try {
    const files = fs.readdirSync(projekteDir);
    
    const projekte = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(projekteDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        return {
          ...data,
          slug: file.replace('.md', '')
        } as Projekt;
      })
      .sort((a, b) => a.order - b.order);
      
    return projekte;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function getBilder(): Promise<Bild[]> {
  const bilderDir = path.join(process.cwd(), 'public/img/Malerei/Malerei');
  
  try {
    const files = fs.readdirSync(bilderDir);
    
    return files
      .filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file))
      .map(file => ({
        title: file.replace(/\.[^/.]+$/, ''),
        image: `/img/Malerei/Malerei/${file}`
      }));
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
} 