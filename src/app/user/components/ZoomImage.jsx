import { useEffect, useRef } from "react";

const ZoomImage = ({ src, style, className, id }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (!window.$ || !imgRef.current) return;

    const $img = window.$(imgRef.current);

    // Remove any previous zoom instance
    $img.removeData("elevateZoom");
    $img.removeData("zoomImage");
    window.$(".zoomContainer").remove();

    // Initialize elevateZoom
    $img.elevateZoom({
      zoomType: "lens",
      lensShape: "square",
      lensSize: 200,
      scrollZoom: true,
      easing: true,
    });

    // Cleanup function
    return () => {
      if (window.$ && imgRef.current) {
        const $img = window.$(imgRef.current);
        $img.removeData("elevateZoom");
        $img.removeData("zoomImage");
        window.$(".zoomContainer").remove();
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      style={style}
      className={className}
      id={id}
    />
  );
};

export default ZoomImage;
