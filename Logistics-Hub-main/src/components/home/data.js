// import images

import HeroImg from '../../content/img/hero/image.svg';
import logo from '../../content/img/header/treasure-logistics-logo.png';
import OverviewProductImg from '../../content/img/overview/product.svg';
import FacebookImg from '../../content/img/overview/brands/facebook.svg';
import GoogleImg from '../../content/img/overview/brands/google.svg';
import CocaColaImg from '../../content/img/overview/brands/coca-cola.svg';
import LinkedInImg from '../../content/img/overview/brands/linkedin.svg';
import SamsungImg from '../../content/img/overview/brands/samsung.svg';
import Feature1Img from '../../content/img/features/feature1-img.svg';
import Feature2Img from '../../content/img/features/feature2-img.svg';
import Feature3Img from '../../content/img/features/feature3-img.svg';
import ArrowRightImg from '../../content/img/features/arrow-right.svg';
import CardIconImg1 from '../../content/img/product/cards/icon1.svg';
import CardIconImg2 from '../../content/img/product/cards/icon2.svg';
import CardIconImg3 from '../../content/img/product/cards/icon3.svg';
import PricingIcon1 from '../../content/img/pricing/icon1.svg';
import PricingIcon2 from '../../content/img/pricing/icon2.svg';
import PricingIcon3 from '../../content/img/pricing/icon3.svg';
import AvatarImg1 from '../../content/img/testimonial/avatar1.png';
import AvatarImg2 from '../../content/img/testimonial/avatar2.png';
import AvatarImg3 from '../../content/img/testimonial/avatar3.png';
import AvatarImg4 from '../../content/img/testimonial/avatar4.png';
import CtaImg1 from '../../content/img/cta/image1.svg';
import CtaImg2 from '../../content/img/cta/image2.svg';
import WhatsappIcon from '../../content/img/copyright/icons8-whatsapp.svg';
import GmailIcon from '../../content/img/copyright/icons8-gmail-logo.svg';
import PhoneIcon from '../../content/img/copyright/icons8-phone.svg';

export const header = {
  logo: logo,
  btnText: 'Login to Dashboard',
};

export const nav = [
  { name: 'About us', href: '#feature' },
  { name: 'Features', href: '#cta' },
  { name: 'Location', href: '#product'},
  { name: 'Reviews', href: '#testimonial' },
  {name: 'Support', href:'chatgpt'}
];

export const hero = {
  title: 'Welcome to the Logistics and Shipping Hub!',
  subtitle: 'Are you in need of reliable shipping and delivery services?',
  btnText: 'Place Order',
  compText: '— Web, iOS and Android',
  image: HeroImg,
};

export const overview = {
  productImg: OverviewProductImg,
  brands: [
    {
      image: FacebookImg,
      delay: 300,
    },
    {
      image: GoogleImg,
      delay: 400,
    },
    {
      image: CocaColaImg,
      delay: 500,
    },
    {
      image: LinkedInImg,
      delay: 600,
    },
    {
      image: SamsungImg,
      delay: 700,
    },
  ],
};

export const features = {
  feature1: {
    pretitle: 'Alwalys ontime',
    title: 'Look no further',
    subtitle:
      "Our platform is your gateway to a world of logistics solutions, connecting you with the most trusted service providers and providing vital information on coverage areas and more. Whether you're a business seeking efficient supply chain management or an individual looking to send a package, we've got you covered.",
    // btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature1Img,
  },
  feature2: {
    pretitle: 'Save some time',
    title: 'Search for Shipping and Delivery Services',
    subtitle:
      'Need to send a package across the country or even overseas? Our search feature allows you to explore a wide range of shipping and delivery services. From express couriers to international freight, you can find the perfect option for your needs.',
    btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature2Img,
  },
  feature3: {
    pretitle: 'Available anytime',
    title: 'Find Reliable Service Providers',
    subtitle:
      '',
    btnLink: '',
    btnIcon: ArrowRightImg,
    image: Feature3Img,
  },
};

export const product = {
  title: 'Explore Coverage Areas.',
  subtitle:
    "No matter where you are or where your package needs to go, our coverage area information will guide you. Easily locate service providers that operate in specific regions, whether it's in your city, across the country, or even globally.",
  // cards: [
  //   {
  //     icon: CardIconImg1,
  //     title: 'Indoor',
  //     subtitle: 'of Ogun State',
  //     delay: 200,
  //   },
  //   {
  //     icon: CardIconImg2,
  //     title: 'All Areas',
  //     subtitle: 'of Ogun State',
  //     delay: 400,
  //   },
  //   {
  //     icon: CardIconImg3,
  //     title: 'Outdoor',
  //     subtitle: 'of Ogun State',
  //     delay: 600,
  //   },
  // ],
};

export const pricing = {
  title: 'Choose your flexible plan.',
  cards: [
    {
      icon: PricingIcon1,
      title: 'Starter Plan',
      services: [
        { name: 'Store unlimited data' },
        { name: 'Export to pdf, xls, csv' },
        { name: 'Cloud server support' },
      ],
      price: '$9.99',
      userAmount: 'up to 3 user + 1.99 per user',
      btnText: 'Get this',
      delay: 300,
    },
    {
      icon: PricingIcon2,
      title: 'Silver Plan',
      services: [
        { name: 'Store unlimited data' },
        { name: 'Export to pdf, xls, csv' },
        { name: 'Cloud server support' },
      ],
      price: '$19.99',
      userAmount: 'up to 3 user + 1.99 per user',
      btnText: 'Get this',
      delay: 600,
    },
    {
      icon: PricingIcon3,
      title: 'Diamond Plan',
      services: [
        { name: 'Store unlimited data' },
        { name: 'Export to pdf, xls, csv' },
        { name: 'Cloud server support' },
      ],
      price: '$29.99',
      userAmount: 'up to 3 user + 1.99 per user',
      btnText: 'Get this',
      delay: 900,
    },
  ],
};

export const testimonials = {
  title: 'We have Thousands of best wishers',
  clients: [
    {
      message:
        'Logistics Hub provides good services. They have outstanding skills and experience."',
      image: AvatarImg1,
      name: 'Pavani',
      position: 'CEO',
      borderColor: '#FF7235',
    },
    {
      message:
        'Your delivery is swift. What I love about your delivery is time management. Thanks for making my business go smoothly, I appreciate it, God bless your business',
      image: AvatarImg2,
      name: 'John',
      position: 'CEO',
      borderColor: '#FFBE21',
    },
    {
      message:
        'Fast,reliable and dependable hard-working but easy to communicate with',
      image: AvatarImg3,
      name: 'OOF',
      position: 'CEO',
      borderColor: '#4756DF',
    },
    {
      message:
      'You are a trustworthy dispatcher,humble,committed to your work 💯...your delivery is fast and reliable 💯....hard working dispatcher 100 💯 lastly your line is also available 💯not like other incompetent dispatchers❌....carry go ✔️✔️always together 💯 ',
      image: AvatarImg4,
      name: 'Body Care',
      position: 'CEO',
      borderColor: '#3EC1F3',
    },
  ],
};

export const cta = {
  title: '20,000+ Delivered merchandise goods across World',
  subtitle: ' Logistics Hub Limited',
  btnText: '',
  img1: CtaImg1,
  img2: CtaImg2,
};

export const footer = {
  // logo: 'Treasure Logistics',
  // links: [
  //   { name: 'Home', href: '/' },
  //   { name: 'About us', href: '/' },
  //   { name: 'Features', href: '/' },

  // ],
  // legal: [
  //   { name: 'Our office Address:'},
  //   { name: 'No 15 Oluwole street saraki Adigbe, Ogun state Abeokuta.', href: '/' },
  //   { name: 'Telephone :'},
  //   { name: '+234-905-127-4834 +234-7089862698', href: '/' },
  //   { name: 'G-mail:'},
  //   { name: 'stephanaduma60@gmail.com', href: '/' },
  // ],
  // newsletter: {
  //   title: 'Newsletter',
  //   subtitle: 'Over 25000 people have subscribed',
  // },
  // form: {
  //   placeholder: 'Enter your email',
  //   btnText: 'Subscribe',
  //   smallText: 'We don’t sell your email and spam',
  // },
};

export const copyright = {
  // link1: {
  //   name: 'Privacy & Terms',
  //   href: '/',
  // },
  // link2: {
  //   name: 'Contact us',
  //   href: '/',
  // },
  // copyText: 'Copyright @ 2022 damel design',
  
  // social: [
  //   { icon: WhatsappIcon, href: 'https://wa.me/+2349051274834' },
  //   { icon: GmailIcon, href: 'mailto:stephenduma60@gmail.com' },
  //   { icon: PhoneIcon, href: 'tel:+2347089862698' },
  // ],
};
