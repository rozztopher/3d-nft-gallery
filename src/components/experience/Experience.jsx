"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import ImagePlane from "./ImagePlane";
import { useSelector } from "react-redux";
import HistoryBar from "./HistoryBar";

const Experience = () => {
  const nfts = useSelector((state) => state.user.nfts);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {nfts.map((nft, i) => {
          console.log(nft);
          if (nft.image.originalUrl) {
            return (
              <ImagePlane
                key={nft.name}
                pos={[
                  getRandomInt(-6, 6),
                  getRandomInt(-3, 3),
                  getRandomInt(-5, 1),
                ]}
                img={nft.image.originalUrl}
              />
            );
          }
        })}
      </Canvas>
      <HistoryBar />
    </>
  );
};

export default Experience;
