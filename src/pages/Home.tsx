import { ScrollNavigator, type SectionDescriptor } from "../components/layout/ScrollNavigator";
import { Intro } from "../components/sections/home/01_Intro";
import { IntroPortal } from "../components/sections/home/IntroPortal";
import { Story } from "../components/sections/home/02_Story";
import { Currently } from "../components/sections/home/03_Currently";
import { Stack } from "../components/sections/home/04_Stack";
import { Build } from "../components/sections/home/05_Build";
import { Proof } from "../components/sections/home/06_Proof";
import { Code } from "../components/sections/home/07_Code";
import { Chasing } from "../components/sections/home/08_Chasing";
import { NowNext } from "../components/sections/home/09_NowNext";
import { Contact } from "../components/sections/home/10_Contact";

const HOME_SECTIONS: SectionDescriptor[] = [
  { id: "intro", title: "INTRO" },
  { id: "again", title: "AGAIN" },
  { id: "story", title: "THE STORY" },
  { id: "currently", title: "CURRENTLY" },
  { id: "stack", title: "THE STACK" },
  { id: "build", title: "WHAT I'VE BUILT" },
  { id: "proof", title: "THINGS I'VE DONE" },
  { id: "code", title: "THE CODING LAB" },
  { id: "chasing", title: "WHAT I'M CHASING" },
  { id: "nownext", title: "NOW / NEXT" },
  { id: "contact", title: "CONTACT" },
];

export const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      <ScrollNavigator sections={HOME_SECTIONS} />
      
      <main>
        <Intro />
        <IntroPortal />
        <Story />
        <Currently />
        <Stack />
        <Build />
        <Proof />
        <Code />
        <Chasing />
        <NowNext />
        <Contact />
      </main>
    </div>
  );
};
