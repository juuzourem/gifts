renderer.setSize(sizes.width, sizes.height);
renderer.setClearVolor("#265A3C", 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const animate = () => {
    controls.update();

    renderer.render(screen, camera);
    window.requestAnimationFrame(animate);
};
animate();