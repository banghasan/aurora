import { Container } from "../components/UI/Container";
import { Heading } from "../components/Heading/Heading";
import { WebsiteList } from "../components/Websites/WebsiteList";
import { useAuth } from "../lib/hooks/useAuth";

const websites = [
  {
    id: 1,
    name: "Roodel",
    url: "http://wunderground.com",
    is_public: true,
  },
  {
    id: 2,
    name: "Feedmix",
    url: "https://canalblog.com",
    is_public: false,
  },
  {
    id: 3,
    name: "Innojam",
    url: "http://ebay.com",
    is_public: false,
  },
  {
    id: 4,
    name: "Mybuzz",
    url: "https://webmd.com",
    is_public: false,
  },
  {
    id: 5,
    name: "Zoombeat",
    url: "https://paypal.com",
    is_public: true,
  },
  {
    id: 6,
    name: "Demizz",
    url: "http://reuters.com",
    is_public: true,
  },
  {
    id: 7,
    name: "Nlounge",
    url: "https://hp.com",
    is_public: true,
  },
];

export default function Home(props) {
  const { user } = useAuth();

  console.log("user ", user);

  return (
    <Container>
      <Heading title="Your Websites">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <WebsiteList websites={websites} />
    </Container>
  );
}
