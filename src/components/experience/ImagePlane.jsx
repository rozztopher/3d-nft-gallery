import * as THREE from "three";
// import { extend } from '@react-three/fiber'
// import {Pla} from "three-stdlib"
import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { setActivePlane, addToHistory } from "@/state/userSlice";

const ImagePlane = (props) => {
  const { img, pos } = props;
  const meshRef = useRef();
  const dispatch = useDispatch();
  let clock = new THREE.Clock();
  useFrame(
    (state, delta) =>
      (meshRef.current.rotation.x = Math.cos(clock.getElapsedTime()) * 0.025)
  );
  useFrame(
    (state, delta) =>
      (meshRef.current.rotation.y = Math.cos(clock.getElapsedTime()) * 0.025)
  );
  useFrame(
    (state, delta) =>
      (meshRef.current.rotation.z = Math.cos(clock.getElapsedTime()) * 0.025)
  );
  const activePlane = useSelector((state) => state.user.activePlane);

  const activate = () => {
      dispatch(setActivePlane(meshRef.current));
      dispatch(addToHistory(img));
  };

  const texture = useLoader(THREE.TextureLoader, img);
  // const planeBufferGeometry = new THREE.PlaneGeometry
  return (
    <mesh ref={meshRef} position={pos} onClick={activate} initPos={pos}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <meshPhongMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  );
};

export default ImagePlane;
