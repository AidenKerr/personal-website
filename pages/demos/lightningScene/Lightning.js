import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, FileLoader, Vector2 } from 'three';

const buzzLength = 600;

const balloonPath = '/demos/lightning/balloon.png';
const balloonFragmentShaderPath = '/demos/lightning/balloon.fs.glsl';
const balloonVertexShaderPath = '/demos/lightning/balloon.vs.glsl';

const lightningFragmentShaderPath = '/demos/lightning/lightning.fs.glsl';
const lightningVertexShaderPath = '/demos/lightning/lightning.vs.glsl';

function getLightningPath(lightningType) {
    switch (lightningType) {
        case 'bolt':
            return '/demos/lightning/lightning.png';
        case 'hum':
            return '/demos/lightning/lightning_hum.png';
        case 'buzz':
            return '/demos/lightning/lightning_buzz.png';
        case 'orb':
            return '/demos/lightning/lightning_orb.png';
    }
}

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((_, delta) => (ref.current.rotation.x += delta));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

function Balloon(props) {
    const [vertexShader, fragmentShader] = useLoader(FileLoader, [
        balloonVertexShaderPath,
        balloonFragmentShaderPath,
    ]);
    const balloonTexture = useLoader(TextureLoader, balloonPath);

    const { clock } = useThree();
    const [clicked, click] = useState(false);
    const uniforms = useRef({
        colourTexture: { type: 'sampler2D', value: balloonTexture },
        mode: { type: 'float', value: 5.0 },
        time: { type: 'float', value: clock.getElapsedTime() },
    });
    useFrame(() => (uniforms.current.time.value = clock.getElapsedTime()));

    return (
        <mesh
            {...props}
            onClick={(event) => {
                setTimeout(() => {
                    click(!clicked);
                    uniforms.current.mode.value = 5.0;
                }, buzzLength);
                uniforms.current.mode.value = 1.0;
            }}
        >
            <planeGeometry />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                transparent
            />
        </mesh>
    );
}

function getLightningTypeUniforms(lightningType) {
    const noiseSpeed = lightningType == 'hum' ? 0.8 : 1.2;
    const thresholdSpeed = (() => {
        switch (lightningType) {
            case 'bolt':
                return 0.0;
            case 'hum':
                return 0.4;
            default:
                return 2.5;
        }
    })();
    const thresholdOffset =
        lightningType == 'hum' ? new Vector2(0.4, 0.4) : new Vector2(1.0, 0.0);

    return [noiseSpeed, thresholdSpeed, thresholdOffset];
}

function Lightning({ lightningType, boltLength = 0.0, ...props }) {
    const zapMissAudio = new Audio('/demos/lightning/zap_miss.wav');
    const [vertexShader, fragmentShader] = useLoader(FileLoader, [
        lightningVertexShaderPath,
        lightningFragmentShaderPath,
    ]);
    const lightningTexture = useLoader(
        TextureLoader,
        getLightningPath(lightningType)
    );

    const buzzTexture = useLoader(TextureLoader, getLightningPath('buzz'));

    const { clock } = useThree();

    const [noiseSpeed, thresholdSpeed, thresholdOffset] =
        getLightningTypeUniforms(lightningType);

    const uniforms = useRef({
        colourTexture: {
            type: 'sampler2D',
            value: lightningTexture,
        },
        noise_speed: { type: 'float', value: noiseSpeed },
        time: { type: 'float', value: clock.getElapsedTime() },
        time_offset: { type: 'float', value: Math.random() * 2.0 },
        start_time: { type: 'float', value: clock.getElapsedTime() },
        threshold_speed: { type: 'float', value: thresholdSpeed },
        threshold_initial_t: { type: 'float', value: boltLength },
        threshold_offset: { type: 'vec3', value: thresholdOffset },
    });
    useFrame(() => (uniforms.current.time.value = clock.getElapsedTime()));

    function setLightningTypeUniforms(type) {
        const [noiseSpeed, thresholdSpeed, thresholdOffset] =
            getLightningTypeUniforms(type);
        uniforms.current.noise_speed.value = noiseSpeed;
        uniforms.current.threshold_speed.value = thresholdSpeed;
        uniforms.current.threshold_offset.value = thresholdOffset;
    }

    let zapTimeout = useRef();

    return (
        <mesh
            {...props}
            onClick={() => {
                // handles the buzz effect
                clearTimeout(zapTimeout);
                zapMissAudio.currentTime = 0;
                zapMissAudio.play();
                if (lightningType != 'hum') return;
                uniforms.current.colourTexture.value = buzzTexture;
                setLightningTypeUniforms('buzz');
                zapTimeout = setTimeout(() => {
                    uniforms.current.colourTexture.value = lightningTexture;
                    setLightningTypeUniforms('hum');
                }, buzzLength);
            }}
        >
            <planeGeometry />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                transparent
            />
        </mesh>
    );
}

export default function LightningScene({ dimension }) {
    // TODO the Lightning component's buzz effect is kinda hacky right now because
    // I ran into issues w/ state updating. This can be revisited.

    return (
        <Canvas
            style={{
                width: dimension,
                height: dimension,
                background: '#24211C',
            }}
        >
            <Balloon scale={[4, 4, 1]} position={[-0.3, -0.6, 0]} />
            <Lightning
                scale={[4, 4, 1]}
                position={[0, 0, 0.0]}
                lightningType={'hum'}
                boltLength={0.99}
            />
        </Canvas>
    );
}
