import Wrapper from "@/components/UI/Wrapper/Wrapper";
import background from "../../../public/images/homeBackground.png";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <img
        className='background__full'
        src={background.src}
        alt='User Login background'
      />
      <div className='center'>
        <Wrapper>{children}</Wrapper>
      </div>
    </>
  );
}
