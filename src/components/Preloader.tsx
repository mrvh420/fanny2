'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

// Register GSAP plugins
gsap.registerPlugin(CustomEase);

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Create refs for each image wrapper with your percentages
  const image0Ref = useRef<HTMLDivElement>(null);
  const image33Ref = useRef<HTMLDivElement>(null);
  const image66Ref = useRef<HTMLDivElement>(null);
  const image99Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderRef.current || !percentageRef.current || !imageContainerRef.current) return;

    // Create custom easing functions - EXACT from reference
    CustomEase.create("customEase", "0.6, 0.01, 0.05, 1");
    CustomEase.create("blurEase", "0.25, 0.1, 0.25, 1");
    CustomEase.create("counterEase", "0.35, 0.0, 0.15, 1");
    CustomEase.create("gentleIn", "0.38, 0.005, 0.215, 1");

    let mainTl: gsap.core.Timeline;

    // Function to initialize the animation - EXACT from reference
    function initAnimation() {
      if (mainTl) mainTl.kill();

      // YOUR percentages with 4 images
      const percentages = [0, 33, 66, 99];
      const wrappers = [
        image0Ref.current,
        image33Ref.current,
        image66Ref.current,
        image99Ref.current
      ];

      const percentageElement = percentageRef.current;
      const imageContainer = imageContainerRef.current;

      if (!percentageElement || !imageContainer || !wrappers.every(w => w)) {
        console.log('Missing elements:', { percentageElement, imageContainer, wrappers });
        return;
      }

      // Reset wrappers and container dimensions - EXACT from reference
      gsap.set(wrappers, { visibility: "hidden", clipPath: "inset(100% 0 0 0)" });
      gsap.set(wrappers[0], { visibility: "visible" });
      gsap.set(imageContainer, { width: "400px", height: "500px" });
      gsap.set(wrappers.map(w => w?.querySelector('img')), {
        scale: 1.2,
        transformOrigin: "center center"
      });

      // Set preloader overlay to start with solid white background
      gsap.set(preloaderRef.current, { display: "flex", opacity: 1, y: 0 });
      if (preloaderRef.current) {
        preloaderRef.current.style.backgroundColor = "#fff";
      }

      mainTl = gsap.timeline();

      // Improved synchronization for image changes and percentage updates - EXACT from reference
      percentages.forEach((percentage, index) => {
        const windowWidth = window.innerWidth;
        const fontSizeRem = 14;
        const fontSizePx =
          fontSizeRem *
          parseFloat(getComputedStyle(document.documentElement).fontSize);
        const textWidth = String(percentage).length * (fontSizePx * 0.6);
        const padding = 32;
        let leftPosition;
        if (percentage === 0) {
          leftPosition = padding + "px";
        } else if (percentage === 99) {
          leftPosition = windowWidth - textWidth - padding + "px";
        } else {
          const availableWidth = windowWidth - 2 * padding - textWidth;
          leftPosition = padding + (availableWidth * percentage) / 100 + "px";
        }

        // Create a synchronized label for this step - EXACT from reference
        mainTl.add(`step${percentage}`, index * 1.5);

        // Set image wrapper to visible - EXACT from reference
        mainTl.set(wrappers[index], { visibility: "visible" }, `step${percentage}`);

        // Animate image reveal and percentage change simultaneously - EXACT from reference
        mainTl.to(
          wrappers[index],
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.65,
            ease: "customEase"
          },
          `step${percentage}`
        );

        // Synchronize percentage update with image reveal - EXACT from reference
        mainTl.to(
          percentageElement,
          {
            innerText: `${percentage}`,
            left: leftPosition,
            duration: 0.65, // Match duration with image reveal
            ease: "counterEase",
            snap: { innerText: 1 },
            onStart: function () {
              gsap.fromTo(
                percentageElement,
                { filter: "blur(8px)" },
                { filter: "blur(0px)", duration: 0.5, ease: "power2.inOut" }
              );
            }
          },
          `step${percentage}`
        ); // Start at the same time as image reveal

        // Hide previous image after current one is revealed - EXACT from reference
        if (index > 0) {
          mainTl.to(
            wrappers[index - 1],
            {
              clipPath: "inset(100% 0 0 0)",
              duration: 0.5,
              ease: "customEase",
              onComplete: function () {
                gsap.set(wrappers[index - 1], { visibility: "hidden" });
              }
            },
            `step${percentage}+=0.15`
          ); // Slight delay after current image starts revealing
        }
      });

      // Final phase: complete the animation and call onComplete
      mainTl.add("complete", "step99+=1");
      mainTl.to(
        preloaderRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            setIsVisible(false);
            onComplete();
          }
        },
        "complete"
      );

      return mainTl;
    }

    // Initialize animation on component mount
    setTimeout(initAnimation, 100);

  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={preloaderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div
        ref={imageContainerRef}
        style={{
          position: 'relative',
          width: '400px',
          height: '500px',
          overflow: 'hidden'
        }}
      >
        <div ref={image0Ref} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          visibility: 'hidden'
        }}>
          <img 
            src="/img/qxxbxw5uf/000_QXX-BXW-5UF-1_1755096188685.jpg" 
            alt="Preloader 1"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div ref={image33Ref} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          visibility: 'hidden'
        }}>
          <img 
            src="/img/qxxbxw5uf/001_QXX-BXW-5UF-2_1755096194443.jpg" 
            alt="Preloader 2"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div ref={image66Ref} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          visibility: 'hidden'
        }}>
          <img 
            src="/img/qxxbxw5uf/002_QXX-BXW-5UF-3_1755096194264.jpg" 
            alt="Preloader 3"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div ref={image99Ref} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          visibility: 'hidden'
        }}>
          <img 
            src="/img/qxxbxw5uf/004_QXX-BXW-5UF-5_1755096185253.jpg" 
            alt="Preloader 4"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>
      
      <div
        ref={percentageRef}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '2rem',
          fontSize: '14rem',
          color: 'black',
          fontFamily: '"PP Neue Montreal", sans-serif',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          zIndex: 10001
        }}
      >
        0
      </div>
    </div>
  );
};

export default Preloader; 