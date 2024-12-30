import ColorPaletteGenerator from "@/components/color-palette-generator";
import Link from "next/link";

export default function Home() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Color Palette Generator</h1>
            <ColorPaletteGenerator/>

            <footer className="mt-8 text-center text-sm text-gray-500">
                <p>© 2024 Color Palette Generator. All rights reserved.</p>
                <p>
                    <Link href="https://winterhost.de/legal/imprint" className="text-blue-500 hover:underline">
                        Imprint
                    </Link>
                </p>
            </footer>
        </main>
    )
}