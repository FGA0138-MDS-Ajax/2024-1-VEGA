import gsap, { Expo, Power3, Quint } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.config({ nullTargetWarn: false });

export function footerAnimation(
  footerContainer,
  footerHrTop,
  footerHrBottom,
  footerTimeBorder
) {
  let ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerContainer,
        start: "top 90%",
        end: "bottom 10%",
        markers: false,
      },
    });

    tl.fromTo(
      footerHrTop,
      {
        width: "0%",
      },
      {
        delay: 0.3,
        duration: 0.5,
        width: "100%",
      }
    )
      .fromTo(
        footerHrBottom,
        {
          width: "0%",
        },
        {
          duration: 0.8,
          width: "100%",
        }
      )
      .to(footerTimeBorder, {
        width: "100%",
      });

    return () => tl.recent();
  });
  return () => ctx.revert();
}

export function preloader() {
  gsap.set("#preloader", {
    display: "none",
    delay: 1,
  });
}

export function sectionTitleAnim(animTitle, animTitleSection) {
  let ctx = gsap.context(() => {
    gsap.set(animTitle, { overflow: "hidden" });
    const textChars = new SplitType(animTitle, { types: "words, chars" });
    const tlH = gsap.timeline({
      scrollTrigger: {
        trigger: animTitle,
        start: "top 90%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      },
    });
    tlH.from(textChars.chars, {
      duration: 0.8,
      y: 200,
      autoAlpha: 0,
      scale: 0.1,
      stagger: {
        from: "start",
        axis: "x",
        amount: 0.3,
        ease: Quint.easeOut,
      },
    });
    return () => tlH.revert();
  }, animTitleSection);
  return () => ctx.revert();
}

export function sectionTitleAnimTwo(animTitle, animTitleSection) {
  let ctx = gsap.context(() => {
    const textChars = new SplitType(animTitle, { types: "words, chars" });
    let tlH2 = gsap.timeline({
      scrollTrigger: {
        trigger: animTitle,
        start: "top 90%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      },
    });
    tlH2.from(textChars.chars, {
      duration: 0.8,
      scale: 1,
      y: 80,
      opacity: 0,
      rotationX: 100,
      transformOrigin: "0% 30% -30",
      ease: Expo.easeInOut,
      stagger: 0.05,
    });
    return () => tlH2.revert();
  }, animTitleSection);
  return () => ctx.revert();
}

export function overImageShows(menuListSection) {
  const ctx = gsap.context(() => {
    if (menuListSection) {
      menuListSection.addEventListener("mouseleave", function (dets) {
        gsap.to(menuListSection.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.8,
        });
      });

      menuListSection.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - menuListSection.getBoundingClientRect().top;
        var dilf = dets.clientX - menuListSection.getBoundingClientRect().left;
        gsap.to(menuListSection.querySelector("img"), {
          opacity: 1,
          ease: Power3,
          top: diff,
          left: dilf + 50,
        });
      });
    }
  });
  return () => ctx.revert();
}

export function imagesOverlayShow(container, image, imagesZoom) {
  let ctx = gsap.context(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        end: "bottom 20%",
        markers: false,
        toggleActions: "play none none none",
      },
    });
    tl.to(container, { duration: 0.7, "--height": "100%", ease: "Power2.ease" })
      .to(container, { duration: 0.7, "--height": "0%", ease: "Power2.ease" })
      .to(image, { duration: 0.2, opacity: 1, delay: -0.7 })
      .from(image, {
        duration: 1,
        scale: 1.2,
        ease: "Power2.easeInOut",
        delay: -0.5,
      });
    if (imagesZoom) {
      let tl12 = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: 1,
          markers: false,
        },
      });
      tl12.fromTo(
        image,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 3.5,
          ease: "expoScale(1, 1.15)",
          transformOrigin: "50% 50%",
          z: 0.1,
          rotationZ: "0.01",
        },
        "<"
      );
    }
    return () => tl.revert();
  }, container);
  return () => ctx.revert();
}

export function imageZoomInOut(container, image) {
  if (image) {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: 1,
          markers: false,
        },
      });
      tl.fromTo(
        image,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 3.5,
          ease: "expoScale(1, 1.15)",
          transformOrigin: "50% 50%",
          z: 0.1,
          rotationZ: "0.01",
        },
        "<"
      );
      return () => tl.revert();
    });
    return () => ctx.revert();
  }
}

export function borderAnimation(border, start, end) {
  if (border) {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: border,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 0.5,
          markers: false,
        },
      });

      tl.fromTo(
        border,
        {
          width: `${start}%`,
        },
        {
          width: `${end}%`,
        }
      );
      return () => tl.revert();
    });
    return () => ctx.revert();
  }
}

export function commonTitleAnimation(title) {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      title,
      { y: 100, opacity: 0 },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        ease: "power4.out",
        duration: 0.8,
        stagger: {
          amount: 0.3,
        },
      }
    );
  });
  return () => ctx.revert();
}

export function scrollButton() {
  const ctx = gsap.context(() => {
    gsap.to(window, {
      scrollTo: 0 + 1000,
      duration: 0.3,
    });
  });
  return () => ctx.revert();
}

export function scrollUpShow(scrollup) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollup,
        scrub: true,
        duration: 0.2,
        markers: false,
        start: "top 90%",
        end: "bottom 80%",
      },
    });
    tl.to(scrollup, { top: "85%" });
    return () => tl.revert();
  });
  return () => ctx.revert();
}

export function scrollUpBtn() {
  const ctx = gsap.context(() => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 0.3,
    });
  });
  return () => ctx.revert();
}

export function foodMenuHr(food_menu_hr) {
  const tl6 = gsap.timeline({
    scrollTrigger: {
      trigger: food_menu_hr,
      start: "top 90%",
      end: "bottom 10%",
      scrub: 0.1,
      markers: false,
    },
  });
  tl6.fromTo(
    food_menu_hr,
    {
      width: "0px",
    },
    {
      duration: 0.3,
      width: "200px",
    }
  );
}
