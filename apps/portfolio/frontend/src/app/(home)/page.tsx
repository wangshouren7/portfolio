import { Background } from "@/domains/assets";
import { Wizard } from "@/domains/models/wizard";
import { Navigation } from "@/domains/navigation";
import RenderModel from "@/libs/ui/render-model";

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center">
      <Background
        fill
        priority
        className="h-full w-full object-cover object-center opacity-50"
        sizes="100vw"
        variant="home"
      />

      <div className="relative h-full w-full">
        <RenderModel className="!absolute top-0 left-0">
          <Wizard />
        </RenderModel>
        <Navigation />
      </div>
    </main>
  );
}
