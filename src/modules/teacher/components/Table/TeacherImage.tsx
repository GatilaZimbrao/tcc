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
    <div>
      {imageLoaded ? (
        <img
          src={src}
          alt={alt}
          width={100}
          height={100}
          onError={handleLoadErro}
        />
      ) : (
        <img src={TeacherDefaultImage} alt={alt} width={100} height={100} />
      )}
    </div>
  );
};

export default TeacherImage;
