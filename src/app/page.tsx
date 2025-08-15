import React from 'react';
import ClientHome from '@/components/ClientHome';
import { getProjekte } from '@/lib/cms';

export default async function HomePage() {
  const projekte = await getProjekte();

  return <ClientHome projekte={projekte} />;
}
