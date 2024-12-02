import dynamic from 'next/dynamic';

const DocViewer = dynamic(() => import('../components/docViewer/docViewer'), { ssr: false });

export default function Page() {
  return <DocViewer />;
}