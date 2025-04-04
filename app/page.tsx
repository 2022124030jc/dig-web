import homePage from '@/config/homePage.json';
import HomePanel from './components/home-panel';

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col md:flex-row">
      {homePage.map((service, index) => (
        <HomePanel
          key={service.title}
          service={service}
          index={index}
          isLast={index === homePage.length - 1}
          category={service.title}
        />
      ))}
    </main>
  );
}
