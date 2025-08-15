'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { Projekt } from '@/lib/cms';

// Register GSAP plugins
gsap.registerPlugin(CustomEase);

interface HomeProps {
  projekte: Projekt[];
}

const Home: React.FC<HomeProps> = ({ projekte }) => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create custom eases
    CustomEase.create("projectExpand", "0.42, 0, 1, 1");
    CustomEase.create("projectCollapse", "0, 0, 0.58, 1");
    CustomEase.create("textReveal", "0.25, 1, 0.5, 1");
    CustomEase.create("squareStretch", "0.22, 1, 0.36, 1");

    const projectItems = document.querySelectorAll(".project-item");
    let activeProject: Element | null = null;
    let isClickAllowed = true;

    // Set initial invisibility of all project items for staggered reveal
    gsap.set(projectItems, {
      opacity: 0,
      y: 20,
      scale: 0.97
    });

    // Add staggered entrance animation on page load
    const entranceTl = gsap.timeline({
      defaults: {
        ease: "power1.out"
      }
    });

    entranceTl.to(projectItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      stagger: 0.04,
      clearProps: "opacity,y,scale",
      onComplete: function () {
        gsap.set(projectItems, {
          clearProps: "all"
        });
      }
    });

    // Initialize text splitting
    projectItems.forEach((project) => {
      const detailElements = project.querySelectorAll(".project-details p");
      detailElements.forEach((element) => {
        const originalText = element.textContent;
        if (originalText) {
          element.innerHTML = "";
          const lineWrapper = document.createElement("div");
          lineWrapper.className = "line-wrapper";
          lineWrapper.style.overflow = "hidden";
          const lineElement = document.createElement("div");
          lineElement.className = "line";
          lineElement.textContent = originalText;
          lineWrapper.appendChild(lineElement);
          element.appendChild(lineWrapper);

          gsap.set(lineElement, {
            y: "100%",
            opacity: 0
          });
        }
      });

      // Set up hover indicators
      const titleContainer = project.querySelector(".project-title-container");
      const leftIndicator = project.querySelector(".hover-indicator.left");
      const rightIndicator = project.querySelector(".hover-indicator.right");

      if (titleContainer && leftIndicator && rightIndicator) {
        gsap.set(leftIndicator, {
          width: "0px",
          height: "6px",
          opacity: 0,
          x: -10,
          zIndex: 20,
          background: "#000"
        });

        gsap.set(rightIndicator, {
          width: "0px",
          height: "6px",
          opacity: 0,
          x: 10,
          zIndex: 20,
          background: "#000"
        });

        titleContainer.addEventListener("mouseenter", () => {
          if (project !== activeProject) {
            gsap.killTweensOf([leftIndicator, rightIndicator]);

            gsap.set([leftIndicator, rightIndicator], {
              clearProps: "all",
              opacity: 0,
              width: "0px",
              height: "6px",
              x: function (i: number) {
                return i === 0 ? -10 : 10;
              }
            });

            const leftTl = gsap.timeline();
            leftTl
              .set(leftIndicator, {
                opacity: 1,
                width: "0px"
              })
              .to(leftIndicator, {
                x: 0,
                width: "10px",
                duration: 0.15,
                ease: "power2.out"
              })
              .to(leftIndicator, {
                width: "6px",
                duration: 0.1,
                ease: "squareStretch"
              });

            const rightTl = gsap.timeline({
              delay: 0.06
            });
            rightTl
              .set(rightIndicator, {
                opacity: 1,
                width: "0px"
              })
              .to(rightIndicator, {
                x: 0,
                width: "10px",
                duration: 0.15,
                ease: "power2.out"
              })
              .to(rightIndicator, {
                width: "6px",
                duration: 0.1,
                ease: "squareStretch"
              });
          }
        });

        titleContainer.addEventListener("mouseleave", () => {
          if (project !== activeProject) {
            gsap.killTweensOf([leftIndicator, rightIndicator]);

            const leftTl = gsap.timeline();
            leftTl
              .to(leftIndicator, {
                width: "10px",
                duration: 0.1,
                ease: "power1.in"
              })
              .to(leftIndicator, {
                width: "0px",
                x: -10,
                opacity: 0,
                duration: 0.15,
                ease: "power2.in"
              });

            const rightTl = gsap.timeline({
              delay: 0.03
            });
            rightTl
              .to(rightIndicator, {
                width: "10px",
                duration: 0.1,
                ease: "power1.in"
              })
              .to(rightIndicator, {
                width: "0px",
                x: 10,
                opacity: 0,
                duration: 0.15,
                ease: "power2.in"
              });
          }
        });
      }
    });

    const applyScaling = (activeIndex: number) => {
      projectItems.forEach((item, index) => {
        const titleContainer = item.querySelector(".project-title-container");
        const distance = Math.abs(index - activeIndex);

        if (index === activeIndex) {
          gsap.to(titleContainer, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.3,
            ease: "projectExpand"
          });
        } else if (distance === 1) {
          gsap.to(titleContainer, {
            scale: 0.95,
            opacity: 0.7,
            filter: "blur(1px)",
            y: 0,
            duration: 0.3,
            ease: "projectExpand"
          });
        } else if (distance === 2) {
          gsap.to(titleContainer, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(2px)",
            y: 0,
            duration: 0.3,
            ease: "projectExpand"
          });
        } else {
          gsap.to(titleContainer, {
            scale: 0.85,
            opacity: 0.3,
            filter: "blur(4px)",
            y: 0,
            duration: 0.3,
            ease: "projectExpand"
          });
        }
      });
    };

    const resetScaling = () => {
      projectItems.forEach((item) => {
        const titleContainer = item.querySelector(".project-title-container");
        gsap.to(titleContainer, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.3,
          ease: "projectCollapse"
        });
      });
    };

    // Set initial states for images - MAKE THEM VISIBLE
    gsap.set(".image-wrapper img", {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      visibility: "visible"
    });

    const toggleProject = (project: Element) => {
      if (!isClickAllowed) return;
      isClickAllowed = false;
      setTimeout(() => {
        isClickAllowed = true;
      }, 300);

      if (activeProject === project) {
        const content = project.querySelector(".project-content");
        const image = project.querySelector(".image-wrapper img");
        const details = project.querySelectorAll(".project-details .line");
        const title = project.querySelector(".project-title");

        if (content && image && title) {
          gsap.to(title, {
            fontSize: "1.5rem",
            letterSpacing: "-0.02em",
            duration: 0.2,
            ease: "projectCollapse"
          });

          gsap.to(image, {
            clipPath: "inset(100% 0 0 0)",
            duration: 0.15,
            ease: "none"
          });

          gsap.to(details, {
            y: "100%",
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "projectCollapse"
          });

          gsap.to(content, {
            maxHeight: 0,
            opacity: 0,
            margin: 0,
            duration: 0.2,
            ease: "projectCollapse",
            onComplete: () => {
              activeProject = null;
              resetScaling();
              gsap.to(projectItems, {
                marginBottom: "0.5rem",
                duration: 0.3,
                ease: "projectExpand",
                stagger: 0.02
              });
            }
          });
        }
      } else {
        if (activeProject) {
          const oldContent = activeProject.querySelector(".project-content");
          const oldImage = activeProject.querySelector(".image-wrapper img");
          const oldDetails = activeProject.querySelectorAll(".project-details .line");
          const oldTitle = activeProject.querySelector(".project-title");

          if (oldContent && oldImage && oldTitle) {
            gsap.to(oldTitle, {
              fontSize: "1.5rem",
              letterSpacing: "-0.02em",
              duration: 0.2,
              ease: "projectCollapse"
            });

            gsap.to(oldImage, {
              clipPath: "inset(100% 0 0 0)",
              duration: 0.15,
              ease: "none"
            });

            gsap.to(oldDetails, {
              y: "100%",
              opacity: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "projectCollapse"
            });

            gsap.to(oldContent, {
              maxHeight: 0,
              opacity: 0,
              margin: 0,
              duration: 0.2,
              ease: "projectCollapse",
              onComplete: () => openNewProject()
            });
          }
        } else {
          openNewProject();
        }

        function openNewProject() {
          activeProject = project;
          const activeIndex = Array.from(projectItems).indexOf(project);
          applyScaling(activeIndex);

          const content = project.querySelector(".project-content");
          const image = project.querySelector(".image-wrapper img");
          const details = project.querySelectorAll(".project-details .line");
          const title = project.querySelector(".project-title");

          if (content && image && title) {
            gsap.set(content, {
              display: "flex",
              autoAlpha: 0,
              height: "auto",
              maxHeight: "none",
              overflow: "hidden"
            });

            const contentHeight = content.offsetHeight;

            gsap.set(content, {
              maxHeight: 0,
              height: "auto",
              autoAlpha: 0,
              overflow: "hidden"
            });

            const tl = gsap.timeline({
              defaults: {
                ease: "projectExpand"
              }
            });

            tl.to(
              title,
              {
                fontSize: window.innerWidth > 768 ? "2rem" : "1.5rem",
                letterSpacing: "0.01em",
                duration: 0.35,
                ease: "projectExpand"
              },
              0
            );

            tl.to(
              content,
              {
                maxHeight: contentHeight,
                autoAlpha: 1,
                margin: "1rem 0",
                duration: 0.4,
                pointerEvents: "auto"
              },
              0
            );

            tl.to(
              image,
              {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.35,
                ease: "power2.out"
              },
              0.05
            );

            tl.to(
              details,
              {
                y: "0%",
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: "textReveal"
              },
              0.2
            );

            if (activeIndex > 0) {
              gsap.to(Array.from(projectItems).slice(0, activeIndex), {
                marginBottom: "0.25rem",
                duration: 0.3,
                ease: "projectCollapse",
                stagger: 0.02
              });
            }

            if (activeIndex < projectItems.length - 1) {
              gsap.to(Array.from(projectItems).slice(activeIndex + 1), {
                marginBottom: "0.25rem",
                duration: 0.3,
                ease: "projectCollapse",
                stagger: 0.02
              });
            }
          }
        }
      }
    };

    projectItems.forEach((item) => {
      item.addEventListener("click", () => {
        toggleProject(item);
      });
    });

    const handleResize = () => {
      if (activeProject) {
        const content = activeProject.querySelector(".project-content");
        const title = activeProject.querySelector(".project-title");

        if (content && title) {
          gsap.to(title, {
            fontSize: window.innerWidth > 768 ? "2rem" : "1.5rem",
            duration: 0.2
          });

          const currentHeight = parseFloat(getComputedStyle(content).height);
          gsap.set(content, {
            maxHeight: "none"
          });
          const autoHeight = content.offsetHeight;

          if (Math.abs(currentHeight - autoHeight) > 1) {
            gsap.set(content, {
              maxHeight: currentHeight
            });
            gsap.to(content, {
              maxHeight: autoHeight,
              duration: 0.2
            });
          } else {
            gsap.set(content, {
              maxHeight: currentHeight
            });
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [projekte]);

  return (
    <div className="projects-component" ref={projectsRef}>
      <div className="projects-list">
        {projekte.map((projekt, index) => (
          <div key={projekt.slug} className="project-item" data-index={index}>
            <div className="project-title-container">
              <div className="hover-indicator left"></div>
              <h2 className="project-title">{projekt.title}</h2>
              <div className="hover-indicator right"></div>
            </div>
            <div className="project-content">
              <div className="project-details left">
                {projekt.left_texts.map((text, i) => (
                  <p key={i} className="detail-label">{text.text}</p>
                ))}
              </div>
              <div className="project-image">
                <div className="image-wrapper">
                  <img 
                    src={projekt.image} 
                    alt={projekt.title}
                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                  />
                </div>
              </div>
              <div className="project-details right">
                {projekt.right_texts.map((text, i) => (
                  <p key={i} className="detail-label">{text.text}</p>
                ))}
                <p className="detail-year">/{projekt.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 