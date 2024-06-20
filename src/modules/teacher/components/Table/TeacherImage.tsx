import React, { useState } from "react";
import TeacherDefaultImage from "../../../../assets/teacher_default_image.png";

interface Props {
  src: string;
  alt: string;
}

const TeacherImage: React.FC<Props> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleLoadErro = () => {
    setImageLoaded(false);
  };

  return (
    <div className="w-[100px] h-[100px] max-w-full max-h-full object-cover">
      {imageLoaded ? (
        <img
          className="w-[100px] h-[100px] object-cover"
          src={src}
          alt={alt}
          width={100}
          height={100}
          crossOrigin="anonymous"
          onError={handleLoadErro}
        />
      ) : (
        <img
          className="w-[100px] h-[100px] object-cover"
          src={TeacherDefaultImage}
          alt={alt}
          width={100}
          height={100}
        />
      )}
    </div>
  );
};

export default TeacherImage;
