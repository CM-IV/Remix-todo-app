import Wrapper from "~/components/wrapper"
import NavComponent from "~/components/nav"
import FooterComponent from "~/components/footer"

export default function MainLayout({ children }: any) {

    return (
        <>
            <Wrapper>
                <NavComponent />
                {children}
                <FooterComponent />
            </Wrapper>
        </>
    )
  
  }