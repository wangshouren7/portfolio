interface IProjectImage {
  src: string;
  link: string;
  title: string;
  type?: "desktop" | "mobile";
}

export interface IProject {
  name: string;
  overview: string;
  skills: string[];
  contributions: string;
  date: string;
  link?: string;
  images?: IProjectImage[];
}
export const projects: IProject[] = [
  {
    name: "Standardized Frontend Design",
    overview:
      "A frontend standardization project built from scratch, including documentation website and Playground website. Implemented automatic generation of navigation and sidebar structures, integrated login page, route switching, internationalization, and other features.",
    skills: ["JavaScript", "Vue", "ESLint", "Vite", "Webpack", "CSS", "i18n"],
    contributions: "",
    date: "2021",
    link: "",
    images: [],
  },
  {
    name: "Poster Low-Code Platform",
    overview:
      "A drag-and-drop based frontend Web editor with a self-developed rendering engine capable of rendering Vue or React components. Features include UI editor, light code, FaaS, and preview pages. Optimization improved delivery efficiency by 50%.",
    skills: [
      "JavaScript",
      "TypeScript",
      "Vue",
      "React",
      "Webpack",
      "Canvas",
      "Node.js",
      "FaaS",
    ],
    contributions: "",
    date: "2022",
    link: "",
    images: [],
  },
  {
    name: "Knowledge Middle Platform",
    overview:
      "A knowledge platform developed using React, Ant Design, and Rx.js, featuring dashboard, single sign-on functionality, multi-window communication, and decision tree visualization. Optimized frontend code and resolved browser compatibility issues.",
    skills: [
      "React",
      "TypeScript",
      "Rx.js",
      "Ant Design",
      "SSO",
      "Decision Trees",
      "D3.js",
    ],
    contributions: `
- Successfully reproduced the homepage dashboard design, receiving client praise
- Integrated single sign-on functionality
- Created multi-window communication capabilities
- Led the design of backend chart data structures
- Optimized frontend code using the chain of responsibility pattern, simplifying over 20 consecutive if-else statements
- Implemented decision tree visualization: created a visual representation of decision trees using tree data structure objects
- Built a desktop application using Electron
- Implemented lazy loading for various parts of the homepage
- Resolved browser compatibility issues to support Firefox 52 and Chrome 69
    `,
    images: [
      {
        src: "/images/resume/ifas.jpg",
        link: "",
        title: "Dashboard",
      },
    ],
    date: "2023",
    link: "",
  },
  // {
  //   name: "ERC20 Token Contract Example",
  //   overview:
  //     "A demonstration project for a decentralized application (dApp) based on the ERC20 protocol, built using Hardhat, RainbowKit, and PNPM Workspace. Implements basic functions of ERC20 tokens.",
  //   skills: [
  //     "Solidity",
  //     "Hardhat",
  //     "Ethereum",
  //     "RainbowKit",
  //     "TypeScript",
  //     "PNPM",
  //     "Smart Contracts",
  //   ],
  //   contributions: "",
  //   date: "2024",
  //   link: "https://github.com/wangshouren7/Web3-Learning-Journey/tree/main/code",
  // },
  {
    name: "Personal Portfolio",
    overview:
      "A modern portfolio website built with Next.js and Three.js. Features interactive 3D graphics, responsive design, and a custom rendering engine for 3D models. Implemented with TypeScript, TailwindCSS, and deployed with Docker multi-stage builds.",
    skills: [
      "Next.js",
      "React 19",
      "Three.js",
      "TypeScript",
      "TailwindCSS",
      "Docker",
    ],
    contributions: `
- Developed a responsive personal portfolio website featuring interactive 3D models and animations using Three.js and React Three Fiber
- Implemented modern UI with TailwindCSS and optimized 3D rendering performance for smooth user experience across devices
- Utilized Next.js App Router for efficient page routing and server components
- Created a custom 3D model rendering system with interactive elements to showcase technical creativity
- Deployed using Docker multi-stage builds for optimized production performance
    `,
    date: "2025",
    link: "https://portfolio.wangshouren.site",
  },
  //   {
  //     name: "Decentralized Exchange (DEX)",
  //     overview:
  //       "Developed a **decentralized exchange (DEX)** application with full-stack implementation including **Solidity smart contracts** and a **React/Next.js** frontend. This DEX allows users to trade **ERC-20 tokens** with **Ethereum** in a trustless, non-custodial environment. Features include **order book** functionality, real-time **price charts**, **trade history**, and **wallet integration**.",
  //     skills: [
  //       "React",
  //       "Next.js",
  //       "TypeScript",
  //       "Solidity",
  //       "Hardhat",
  //       "TailwindCSS",
  //       "Web3",
  //       "wagmi",
  //       "RainbowKit",
  //       "lightweight-charts",
  //       "React Query",
  //       "DaisyUI",
  //     ],
  //     contributions: `
  // - Architected and implemented **smart contracts** for token exchange with order book functionality
  // - Built **responsive UI components** including order book, trading view, balance management, and trade history
  // - Integrated **Web3 wallet connectivity** for transaction signing and user authentication
  // - Implemented **real-time price chart visualization** using financial charting libraries
  // - Designed a **gas-efficient fee mechanism** for the exchange operations
  // - Developed **deployment pipelines** for both local development and testnet environments`,
  //     date: "2025",
  //     link: "https://dex.wangshouren.site",
  //   },
  {
    name: "NFT Topia",
    overview:
      "Developed **NFT-Topia**, a full-stack blockchain marketplace for creating, showcasing, and trading NFTs (Non-Fungible Tokens). The platform enables users to mint digital artworks as unique tokens, manage personal collections, and conduct secure transactions using cryptocurrency. Implemented with a modern tech stack and deployed to a live production environment.",
    skills: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Solidity",
      "Hardhat",
      "RainbowKit",
      "Wagmi",
      "Viem",
      "Storybook",
      "IPFS",
    ],
    contributions: `
- Architected and implemented the **smart contract system** using **Solidity** for NFT minting, listing, and trading functionality
- Built a responsive and intuitive frontend with **Next.js** and **React**, featuring multi-language support through internationalization
- Integrated **IPFS storage** via Pinata for decentralized storage of NFT metadata and assets
- Implemented secure wallet connection using **RainbowKit** and **Wagmi** for blockchain interaction
- Created a modular, domain-driven application structure for maintainable and scalable codebase
- Configured testing, deployment, and verification workflows for both frontend and smart contracts
    `,
    date: "2025",
    link: "https://nft-topia.wangshouren.site",
    images: [
      {
        src: "https://nft-topia.wangshouren.site/screenshots/dark/desktop/home.png",
        link: "https://nft-topia.wangshouren.site",
        title: "Home page",
      },
      {
        src: "https://nft-topia.wangshouren.site/screenshots/dark/desktop/create-nft.png",
        link: "https://nft-topia.wangshouren.site/create-nft",
        title: "Create NFT",
        type: "desktop",
      },
      {
        src: "https://nft-topia.wangshouren.site/screenshots/dark/mobile/home.png",
        link: "https://nft-topia.wangshouren.site",
        title: "Home page(Mobile)",
        type: "mobile",
      },
      {
        src: "https://nft-topia.wangshouren.site/screenshots/dark/mobile/create-nft.png",
        link: "https://nft-topia.wangshouren.site/create-nft",
        title: "Create NFT",
        type: "mobile",
      },
    ],
  },
  {
    name: "3D Meteorological Visualization Platform",
    overview: `Developed a sophisticated 3D visualization platform for meteorological data using **WebGL**, **Cesium.js** and **JavaScript/TypeScript** that enables weather scientists and meteorologists to analyze complex atmospheric phenomena.`,
    skills: [
      "TypeScript",
      "JavaScript",
      "WebGL",
      "Cesium.js",
      "MapBox GL",
      "Vue.js",
      "Webpack",
    ],
    contributions: `
- Implemented advanced 3D meteorological visualizations including:
  - Wind field simulations
  - Radar data rendering
  - Air quality modeling
  
- Engineered comprehensive visualization modules with customizable parameters for:
  - Wind speed & direction
  - Particle systems density
  - Color mapping for data intensity
  - Multiple atmospheric layers

- Created modular, reusable components that handle various data sources and visualization types, enabling rapid development of new meteorological visualizations

- Developed interactive elements for enhanced data analysis:
  - Dynamic legends
  - Time-based data filtering
  - Advanced camera controls

- Built real-world application examples:
  - 3D wind fields visualization
  - Ground-attached wind patterns
  - Radar 3D isosurface rendering
  - Air quality monitoring

- Utilized **WebGL shaders** to optimize performance for real-time rendering of meteorological data with **millions** of particles
`,
    date: "2022",
    link: "https://meteorological-3d.wangshouren.site",
    images: [
      {
        src: "https://meteorological-3d.wangshouren.site/examples/0_%E9%9B%B7%E8%BE%BE/0_%E9%9B%B7%E8%BE%BE%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA/static/screenshot.gif",
        link: "https://meteorological-3d.wangshouren.site/examples/0_%E9%9B%B7%E8%BE%BE/0_%E9%9B%B7%E8%BE%BE%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA/index.html",
        title: "Radar Ray Tracing",
      },
      {
        src: "https://meteorological-3d.wangshouren.site/examples/0_%E9%9B%B7%E8%BE%BE/1_%E9%9B%B7%E8%BE%BE%E8%B4%B4%E5%9C%B0/static/screenshot.gif",
        link: "https://meteorological-3d.wangshouren.site/examples/0_%E9%9B%B7%E8%BE%BE/1_%E9%9B%B7%E8%BE%BE%E8%B4%B4%E5%9C%B0/index.html",
        title: "Radar Surface",
      },
      {
        src: "https://meteorological-3d.wangshouren.site/examples/0_%E9%9B%B7%E8%BE%BE/2_%E9%9B%B7%E8%BE%BE%E4%BD%93%E6%89%AB%E5%8A%A8%E7%94%BB/static/screenshot.gif",
        link: "https://meteorological-3d.wangshouren.site/examples/0_%E9%9B%B7%E8%BE%BE/2_%E9%9B%B7%E8%BE%BE%E4%BD%93%E6%89%AB%E5%8A%A8%E7%94%BB/index.html",
        title: "Radar Volume Scan Animation",
      },
      {
        src: "https://meteorological-3d.wangshouren.site/examples/3_%E9%A3%8E%E5%9C%BA/%E4%B8%89%E7%BB%B4%E9%A3%8E%E5%9C%BA/static/screenshot.gif",
        link: "https://meteorological-3d.wangshouren.site/examples/3_%E9%A3%8E%E5%9C%BA/%E4%B8%89%E7%BB%B4%E9%A3%8E%E5%9C%BA/index.html",
        title: "3D Wind Field",
      },
      {
        src: "https://meteorological-3d.wangshouren.site/examples/3_%E9%A3%8E%E5%9C%BA/%E8%B4%B4%E5%9C%B0%E9%A3%8E%E5%9C%BA/static/screenshot.png",
        link: "https://meteorological-3d.wangshouren.site/examples/3_%E9%A3%8E%E5%9C%BA/%E8%B4%B4%E5%9C%B0%E9%A3%8E%E5%9C%BA/index.html",
        title: "Terrain Wind Field",
      },
    ],
  },
];
