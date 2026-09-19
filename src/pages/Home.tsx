import { Container } from "../components/ui/Container";
import { Hero } from "../components/sections/Hero";
import { ActivityPreview } from "../components/sections/ActivityPreview";

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Container>
        <ActivityPreview />
      </Container>
    </div>
  );
};
