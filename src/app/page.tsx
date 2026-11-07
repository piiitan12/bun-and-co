import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import PhotoLoop from "@/components/home/PhotoLoop";
import MenuPreview from "@/components/home/MenuPreview";
import News from "@/components/home/News";
import Access from "@/components/home/Access";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <PhotoLoop />
      <MenuPreview />
      <News />
      <Access />
    </>
  );
}
