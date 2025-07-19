import { Fira_Code, Geist, IBM_Plex_Mono, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display",
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

const firacode = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin"],
});
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
    weight: ["400"],
});

export const metadata = {
    title: "Gilang Rifaldi",
    description: "Professional portfolio website",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang='en'
            className={`${geistSans.variable} ${playfairDisplay.variable} ${jetBrainsMono.variable} ${firacode.variable} ${ibmPlexMono.variable}`}>
            <body className='select-none'>
                <div
                    className='fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-100 ease-out bg-home'
                    style={{
                        filter: "var(--scroll-blur, blur(0px))",
                        zIndex: -1,
                    }}></div>
                <div className='relative w-full overflow-clip'>{children}</div>
            </body>
        </html>
    );
}
