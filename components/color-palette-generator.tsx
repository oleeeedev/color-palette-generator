"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Palette } from '@/lib/types'
import { generateRandomColor, generateComplementaryColor, generateAnalogousColors, generateTriadicColors } from '@/lib/colorUtils'
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner";

export default function ColorPaletteGenerator() {
    const [palette, setPalette] = useState<Palette>([])
    const [colorCount, setColorCount] = useState(5)

    const generatePalette = () => {
        const newPalette: Palette = []
        const baseColor = generateRandomColor()
        newPalette.push({ hex: baseColor, name: 'Base' })
        newPalette.push({ hex: generateComplementaryColor(baseColor), name: 'Complementary' })

        const analogous = generateAnalogousColors(baseColor)
        newPalette.push({ hex: analogous[0], name: 'Analogous 1' })
        newPalette.push({ hex: analogous[1], name: 'Analogous 2' })

        const triadic = generateTriadicColors(baseColor)
        newPalette.push({ hex: triadic[0], name: 'Triadic 1' })
        newPalette.push({ hex: triadic[1], name: 'Triadic 2' })

        setPalette(newPalette.slice(0, colorCount))
    }

    const copyToClipboard = (color: string) => {
        navigator.clipboard.writeText(color)
        toast("Color Copied", {
            description: `${color} has been copied to your clipboard.`,
        })
    }

    const savePalette = () => {
        const paletteString = palette.map(color => color.hex).join(',')
        const creditText = "\n\nGenerated by Color Palette Generator."
        const blob = new Blob([paletteString + creditText], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'color-palette.txt'
        link.click()
        URL.revokeObjectURL(url)
        toast("Palette Saved", {
            description: "Your color palette has been saved as a text file.",
        })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4 justify-center">
                <div className="flex items-center space-x-4">
                    <Slider
                        value={[colorCount]}
                        onValueChange={(value) => setColorCount(value[0])}
                        max={6}
                        min={3}
                        step={1}
                        className="w-[200px]"
                    />
                    <span>Colors: {colorCount}</span>
                </div>
                <Button onClick={generatePalette}>Generate Palette</Button>
                <Button onClick={savePalette} variant="outline">Save Palette</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {palette.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className="w-full h-32 rounded-md cursor-pointer transition-transform hover:scale-105"
                            style={{ backgroundColor: color.hex }}
                            onClick={() => copyToClipboard(color.hex)}
                        ></div>
                        <Input
                            value={color.hex}
                            readOnly
                            className="mt-2 text-center"
                            onClick={() => copyToClipboard(color.hex)}
                        />
                        <span className="mt-1 text-sm">{color.name}</span>
                    </div>
                ))}
            </div>
            <Toaster />
        </div>
    )
}