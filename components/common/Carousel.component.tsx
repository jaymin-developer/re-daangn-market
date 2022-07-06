import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface IPropsCarousel {
  images: string[];
}

const CarouselComponent = (props: IPropsCarousel) => {
  const settings = {
    dots: true,
    arrows: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Carousel {...settings}>
      {props.images?.map((el) => (
        <SliderImgBoxDiv>
          <SliderImg src={`https://storage.googleapis.com/${el}`} />
        </SliderImgBoxDiv>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;

const Carousel = styled(Slider)`
  width: 644px;

  .slick-dots {
    transform: translateY(-40px);
  }
`;

const SliderImgBoxDiv = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
`;

const SliderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: center;
`;
