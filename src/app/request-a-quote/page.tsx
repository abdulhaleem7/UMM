import RequestAQuote from "@/components/requestAQuote";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "About umm - Transport & Logistics ",
};
const page = () => {
   return (
      <Wrapper>
         <RequestAQuote />
      </Wrapper>
   )
}

export default page