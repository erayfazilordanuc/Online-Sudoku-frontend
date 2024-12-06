import Game from "@src/components/Game";

export default async function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <div className="py-20 flex justify-center bg">
        <div>
          <Game
            board={
              "1,9,6,0,4,3,0,8,7,8,5,3,1,6,7,2,9,4,4,7,2,5,8,9,6,0,0,0,1,8,0,7,0,9,5,0,5,6,0,0,3,1,0,4,2,2,4,9,8,0,0,7,3,1,9,3,0,7,2,5,0,0,8,7,8,1,6,9,0,3,0,0,6,2,0,3,1,8,4,7,9"
            }
            difficulty={2}
          />
        </div>
      </div>
    </main>
  );
}
